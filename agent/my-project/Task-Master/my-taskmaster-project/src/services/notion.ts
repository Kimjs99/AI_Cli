// Notion API 연동 서비스
export interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  properties: Record<string, any>;
}

export interface NotionDatabase {
  id: string;
  title: string;
  description?: string;
  url: string;
}

export interface NotionConfig {
  apiKey: string;
  databaseId: string;
}

class NotionService {
  private config: NotionConfig | null = null;
  private baseUrl = 'https://api.notion.com/v1';
  private isInitialized = false;

  // Notion API 설정
  initialize(config: NotionConfig) {
    this.config = config;
    this.isInitialized = true;
    console.log('Notion API 초기화 완료');
  }

  // 데이터베이스 목록 가져오기
  async getDatabases(): Promise<NotionDatabase[]> {
    if (!this.isInitialized || !this.config) {
      throw new Error('Notion API가 초기화되지 않았습니다.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'object',
            value: 'database',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Notion API 오류: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.results.map((db: any) => ({
        id: db.id,
        title: db.title?.[0]?.plain_text || '제목 없음',
        description: db.description?.[0]?.plain_text,
        url: db.url,
      }));
    } catch (error) {
      console.error('데이터베이스 목록 가져오기 실패:', error);
      throw error;
    }
  }

  // 데이터베이스의 페이지들 가져오기
  async getPages(databaseId: string, filter?: any): Promise<NotionPage[]> {
    if (!this.isInitialized || !this.config) {
      throw new Error('Notion API가 초기화되지 않았습니다.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter,
          sorts: [
            {
              property: 'Created time',
              direction: 'descending',
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`페이지 가져오기 실패: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.results.map((page: any) => ({
        id: page.id,
        title: this.extractTitle(page.properties),
        url: page.url,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        properties: page.properties,
      }));
    } catch (error) {
      console.error('페이지 가져오기 실패:', error);
      throw error;
    }
  }

  // 새 페이지 생성
  async createPage(databaseId: string, properties: Record<string, any>): Promise<NotionPage> {
    if (!this.isInitialized || !this.config) {
      throw new Error('Notion API가 초기화되지 않았습니다.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/pages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parent: {
            database_id: databaseId,
          },
          properties,
        }),
      });

      if (!response.ok) {
        throw new Error(`페이지 생성 실패: ${response.status} - ${response.statusText}`);
      }

      const page = await response.json();
      return {
        id: page.id,
        title: this.extractTitle(page.properties),
        url: page.url,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        properties: page.properties,
      };
    } catch (error) {
      console.error('페이지 생성 실패:', error);
      throw error;
    }
  }

  // 페이지 업데이트
  async updatePage(pageId: string, properties: Record<string, any>): Promise<NotionPage> {
    if (!this.isInitialized || !this.config) {
      throw new Error('Notion API가 초기화되지 않았습니다.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/pages/${pageId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties,
        }),
      });

      if (!response.ok) {
        throw new Error(`페이지 업데이트 실패: ${response.status} - ${response.statusText}`);
      }

      const page = await response.json();
      return {
        id: page.id,
        title: this.extractTitle(page.properties),
        url: page.url,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        properties: page.properties,
      };
    } catch (error) {
      console.error('페이지 업데이트 실패:', error);
      throw error;
    }
  }

  // 페이지 삭제
  async deletePage(pageId: string): Promise<boolean> {
    if (!this.isInitialized || !this.config) {
      throw new Error('Notion API가 초기화되지 않았습니다.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/pages/${pageId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archived: true,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('페이지 삭제 실패:', error);
      return false;
    }
  }

  // 할 일 데이터베이스에서 할 일 가져오기
  async getTasks(databaseId: string): Promise<Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    dueDate?: string;
    description?: string;
  }>> {
    try {
      const pages = await this.getPages(databaseId);
      
      return pages.map(page => {
        const properties = page.properties;
        
        return {
          id: page.id,
          title: this.extractTitle(properties),
          status: this.extractSelectValue(properties, 'Status') || 'Not Started',
          priority: this.extractSelectValue(properties, 'Priority') || 'Medium',
          dueDate: this.extractDateValue(properties, 'Due Date') || undefined,
          description: this.extractRichTextValue(properties, 'Description') || undefined,
        };
      });
    } catch (error) {
      console.error('할 일 가져오기 실패:', error);
      throw error;
    }
  }

  // 할 일 생성
  async createTask(databaseId: string, task: {
    title: string;
    status?: string;
    priority?: string;
    dueDate?: string;
    description?: string;
  }): Promise<any> {
    const properties: Record<string, any> = {};

    // 제목 설정
    if (task.title) {
      properties['Name'] = {
        title: [
          {
            text: {
              content: task.title,
            },
          },
        ],
      };
    }

    // 상태 설정
    if (task.status) {
      properties['Status'] = {
        select: {
          name: task.status,
        },
      };
    }

    // 우선순위 설정
    if (task.priority) {
      properties['Priority'] = {
        select: {
          name: task.priority,
        },
      };
    }

    // 마감일 설정
    if (task.dueDate) {
      properties['Due Date'] = {
        date: {
          start: task.dueDate,
        },
      };
    }

    // 설명 설정
    if (task.description) {
      properties['Description'] = {
        rich_text: [
          {
            text: {
              content: task.description,
            },
          },
        ],
      };
    }

    return await this.createPage(databaseId, properties);
  }

  // 속성에서 제목 추출
  private extractTitle(properties: Record<string, any>): string {
    const nameProperty = properties['Name'] || properties['Title'];
    if (nameProperty?.title) {
      return nameProperty.title[0]?.plain_text || '';
    }
    return '';
  }

  // 속성에서 Select 값 추출
  private extractSelectValue(properties: Record<string, any>, propertyName: string): string | null {
    const property = properties[propertyName];
    if (property?.select) {
      return property.select.name;
    }
    return null;
  }

  // 속성에서 날짜 값 추출
  private extractDateValue(properties: Record<string, any>, propertyName: string): string | null {
    const property = properties[propertyName];
    if (property?.date) {
      return property.date.start;
    }
    return null;
  }

  // 속성에서 Rich Text 값 추출
  private extractRichTextValue(properties: Record<string, any>, propertyName: string): string | null {
    const property = properties[propertyName];
    if (property?.rich_text) {
      return property.rich_text[0]?.plain_text || '';
    }
    return null;
  }

  // 연결 해제
  disconnect() {
    this.config = null;
    this.isInitialized = false;
    console.log('Notion 연결 해제됨');
  }

  // 연결 상태 확인
  isConnected(): boolean {
    return this.isInitialized && !!this.config;
  }

  // 설정된 데이터베이스 ID 가져오기
  getDatabaseId(): string | null {
    return this.config?.databaseId || null;
  }
}

export const notionService = new NotionService();
export default notionService;

