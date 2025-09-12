#!/bin/bash

# GitHub 자동 업로드 스크립트
# Usage: ./upload_to_github.sh

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN 환경변수가 설정되지 않았습니다."
    echo "다음 명령어로 설정하세요: export GITHUB_TOKEN='your_token_here'"
    exit 1
fi

GITHUB_USERNAME="Kimjs99"
PROJECTS=("AI_Cli" "backend" "cafa-grading-system" "claude-code-youtube-hub" "FitGrow" "google-calendar-scheduler" "student-performance-analyzer" "weather")

# GitHub API로 리포지토리 생성하는 함수
create_repo() {
    local repo_name=$1
    echo "🏗️  Creating repository: $repo_name"
    
    curl -s -H "Authorization: token $GITHUB_TOKEN" \
         -H "Accept: application/vnd.github.v3+json" \
         https://api.github.com/user/repos \
         -d "{\"name\":\"$repo_name\",\"private\":false}" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Repository $repo_name created successfully"
    else
        echo "⚠️  Repository $repo_name might already exist or creation failed"
    fi
}

# 각 프로젝트 업로드
for project in "${PROJECTS[@]}"; do
    echo ""
    echo "================================================="
    echo "📦 Processing project: $project"
    echo "================================================="
    
    if [ ! -d "$project" ]; then
        echo "❌ Directory $project not found, skipping..."
        continue
    fi
    
    # GitHub 리포지토리 생성
    create_repo "$project"
    
    # Git remote 추가 및 푸시
    cd "$project"
    
    # 기존 origin 제거 (있다면)
    git remote remove origin 2>/dev/null || true
    
    # 새 origin 추가
    git remote add origin "https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$project.git"
    
    # 푸시
    echo "⬆️  Pushing $project to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully uploaded $project to GitHub"
        echo "🔗 Repository URL: https://github.com/$GITHUB_USERNAME/$project"
    else
        echo "❌ Failed to upload $project"
    fi
    
    cd ..
    
    # 잠깐 대기 (API 제한 방지)
    sleep 2
done

echo ""
echo "🎉 GitHub 업로드 완료!"
echo "모든 프로젝트가 https://github.com/$GITHUB_USERNAME 에 업로드되었습니다."