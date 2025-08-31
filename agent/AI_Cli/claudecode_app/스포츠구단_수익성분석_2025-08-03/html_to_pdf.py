#!/usr/bin/env python3
"""
HTML to PDF Converter
웹페이지를 PDF로 변환하는 스크립트
"""

import os
import sys
from pathlib import Path

def install_packages():
    """필요한 패키지 설치"""
    try:
        import weasyprint
        print("✅ weasyprint가 이미 설치되어 있습니다.")
        return True
    except ImportError:
        print("📦 weasyprint 패키지를 설치하는 중...")
        try:
            import subprocess
            result = subprocess.run([sys.executable, "-m", "pip", "install", "weasyprint"], 
                                  capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ weasyprint 설치 완료")
                return True
            else:
                print(f"❌ 설치 실패: {result.stderr}")
                print("수동으로 설치해주세요: pip install weasyprint")
                return False
        except Exception as e:
            print(f"❌ 설치 중 오류 발생: {e}")
            return False

def convert_html_to_pdf(html_file_path, output_pdf_path=None):
    """HTML 파일을 PDF로 변환"""
    try:
        # weasyprint 임포트
        from weasyprint import HTML, CSS
        from weasyprint.text.fonts import FontConfiguration
        
        # 입력 파일 경로 확인
        html_path = Path(html_file_path)
        if not html_path.exists():
            print(f"❌ HTML 파일을 찾을 수 없습니다: {html_file_path}")
            return False
        
        # 출력 PDF 경로 설정
        if output_pdf_path is None:
            output_pdf_path = html_path.with_suffix('.pdf')
        
        print(f"📄 변환 시작: {html_path.name} → {Path(output_pdf_path).name}")
        
        # 폰트 설정 (한글 지원)
        font_config = FontConfiguration()
        
        # PDF 생성에 최적화된 CSS 추가
        pdf_css = CSS(string='''
            @page {
                size: A4;
                margin: 2cm;
            }
            
            body {
                font-family: "Noto Sans CJK KR", "Malgun Gothic", "맑은 고딕", sans-serif;
                font-size: 12px;
                line-height: 1.4;
            }
            
            .container {
                box-shadow: none !important;
                border-radius: 0 !important;
            }
            
            .modal {
                display: none !important;
            }
            
            .team-item {
                break-inside: avoid;
                page-break-inside: avoid;
                margin-bottom: 15px;
            }
            
            .stats {
                break-inside: avoid;
                page-break-inside: avoid;
            }
            
            .header {
                break-after: avoid;
            }
            
            /* 링크 스타일 제거 */
            .team-name {
                cursor: default !important;
                color: #2c3e50 !important;
            }
            
            .league-stat {
                cursor: default !important;
            }
            
            /* 반응형 미디어 쿼리 무효화 */
            @media print {
                .financial-info {
                    grid-template-columns: 1fr 1fr !important;
                }
            }
        ''', font_config=font_config)
        
        # HTML을 PDF로 변환
        html_doc = HTML(filename=str(html_path))
        html_doc.write_pdf(
            str(output_pdf_path),
            stylesheets=[pdf_css],
            font_config=font_config
        )
        
        print(f"✅ PDF 변환 완료: {output_pdf_path}")
        print(f"📁 파일 크기: {Path(output_pdf_path).stat().st_size / 1024:.1f} KB")
        return True
        
    except ImportError as e:
        print(f"❌ 필요한 패키지가 설치되지 않았습니다: {e}")
        return False
    except Exception as e:
        print(f"❌ PDF 변환 중 오류 발생: {e}")
        return False

def main():
    """메인 함수"""
    print("🔄 HTML to PDF 변환기")
    print("=" * 50)
    
    # 패키지 설치 확인
    if not install_packages():
        print("❌ 필요한 패키지 설치에 실패했습니다.")
        return
    
    # HTML 파일 경로
    html_file = "/Users/kimpro/cladecode_app/profitable_sports_teams.html"
    pdf_file = "/Users/kimpro/cladecode_app/profitable_sports_teams.pdf"
    
    # 파일 존재 확인
    if not os.path.exists(html_file):
        print(f"❌ HTML 파일을 찾을 수 없습니다: {html_file}")
        return
    
    print(f"📂 입력 파일: {os.path.basename(html_file)}")
    print(f"📂 출력 파일: {os.path.basename(pdf_file)}")
    print()
    
    # PDF 변환 실행
    success = convert_html_to_pdf(html_file, pdf_file)
    
    if success:
        print("\n🎉 변환이 성공적으로 완료되었습니다!")
        print(f"📄 생성된 PDF: {pdf_file}")
    else:
        print("\n❌ 변환에 실패했습니다.")

if __name__ == "__main__":
    main()