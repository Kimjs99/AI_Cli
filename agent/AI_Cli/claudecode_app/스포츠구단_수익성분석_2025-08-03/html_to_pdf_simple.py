#!/usr/bin/env python3
"""
HTML to PDF Converter (Alternative Method)
브라우저 기반으로 HTML을 PDF로 변환하는 스크립트
"""

import os
import sys
import subprocess
from pathlib import Path

def check_and_install_playwright():
    """Playwright 설치 및 브라우저 설치"""
    try:
        import playwright
        print("✅ playwright가 이미 설치되어 있습니다.")
        return True
    except ImportError:
        print("📦 playwright 패키지를 설치하는 중...")
        try:
            # playwright 설치
            result = subprocess.run([sys.executable, "-m", "pip", "install", "playwright"], 
                                  capture_output=True, text=True)
            if result.returncode != 0:
                print(f"❌ playwright 설치 실패: {result.stderr}")
                return False
            
            # 브라우저 설치
            print("📦 브라우저를 설치하는 중...")
            result = subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], 
                                  capture_output=True, text=True)
            if result.returncode != 0:
                print(f"❌ 브라우저 설치 실패: {result.stderr}")
                return False
            
            print("✅ playwright 및 브라우저 설치 완료")
            return True
        except Exception as e:
            print(f"❌ 설치 중 오류 발생: {e}")
            return False

def convert_html_to_pdf_playwright(html_file_path, output_pdf_path=None):
    """Playwright를 사용하여 HTML을 PDF로 변환"""
    try:
        from playwright.sync_api import sync_playwright
        
        # 입력 파일 경로 확인
        html_path = Path(html_file_path).resolve()
        if not html_path.exists():
            print(f"❌ HTML 파일을 찾을 수 없습니다: {html_file_path}")
            return False
        
        # 출력 PDF 경로 설정
        if output_pdf_path is None:
            output_pdf_path = html_path.with_suffix('.pdf')
        
        print(f"📄 변환 시작: {html_path.name} → {Path(output_pdf_path).name}")
        
        with sync_playwright() as p:
            # 브라우저 실행
            browser = p.chromium.launch()
            page = browser.new_page()
            
            # HTML 파일 로드
            file_url = f"file://{html_path}"
            page.goto(file_url)
            
            # 페이지가 완전히 로드될 때까지 대기
            page.wait_for_load_state('networkidle')
            
            # PDF 생성 옵션
            pdf_options = {
                'path': str(output_pdf_path),
                'format': 'A4',
                'margin': {
                    'top': '2cm',
                    'right': '1.5cm',
                    'bottom': '2cm',
                    'left': '1.5cm'
                },
                'print_background': True,
                'prefer_css_page_size': True
            }
            
            # PDF 생성
            page.pdf(**pdf_options)
            
            browser.close()
        
        print(f"✅ PDF 변환 완료: {output_pdf_path}")
        print(f"📁 파일 크기: {Path(output_pdf_path).stat().st_size / 1024:.1f} KB")
        return True
        
    except ImportError as e:
        print(f"❌ 필요한 패키지가 설치되지 않았습니다: {e}")
        return False
    except Exception as e:
        print(f"❌ PDF 변환 중 오류 발생: {e}")
        return False

def convert_with_builtin_browser():
    """시스템 브라우저를 사용하여 PDF 생성 (수동)"""
    html_file = "/Users/kimpro/cladecode_app/profitable_sports_teams.html"
    
    print("🌐 브라우저 기반 PDF 생성 가이드")
    print("=" * 50)
    print("1. 다음 명령으로 HTML 파일을 브라우저에서 열기:")
    print(f"   open '{html_file}'")
    print()
    print("2. 브라우저에서:")
    print("   - Cmd+P (인쇄 메뉴 열기)")
    print("   - 대상을 'PDF로 저장'으로 선택")
    print("   - 레이아웃을 '세로'로 설정")
    print("   - 배경 그래픽 포함 체크")
    print("   - '저장' 클릭")
    print()
    print("자동 변환을 원하면 다른 방법을 시도해보겠습니다...")
    
    # 브라우저에서 HTML 파일 열기
    try:
        subprocess.run(["open", html_file], check=True)
        print("✅ 브라우저에서 HTML 파일을 열었습니다.")
        return True
    except subprocess.CalledProcessError:
        print("❌ 브라우저에서 파일을 열 수 없습니다.")
        return False

def main():
    """메인 함수"""
    print("🔄 HTML to PDF 변환기 (Alternative)")
    print("=" * 50)
    
    html_file = "/Users/kimpro/cladecode_app/profitable_sports_teams.html"
    pdf_file = "/Users/kimpro/cladecode_app/profitable_sports_teams.pdf"
    
    # 파일 존재 확인
    if not os.path.exists(html_file):
        print(f"❌ HTML 파일을 찾을 수 없습니다: {html_file}")
        return
    
    print(f"📂 입력 파일: {os.path.basename(html_file)}")
    print(f"📂 출력 파일: {os.path.basename(pdf_file)}")
    print()
    
    # Playwright 방법 시도
    print("방법 1: Playwright 사용")
    if check_and_install_playwright():
        success = convert_html_to_pdf_playwright(html_file, pdf_file)
        if success:
            print("\n🎉 변환이 성공적으로 완료되었습니다!")
            print(f"📄 생성된 PDF: {pdf_file}")
            return
    
    print("\n방법 2: 브라우저 수동 변환")
    convert_with_builtin_browser()

if __name__ == "__main__":
    main()