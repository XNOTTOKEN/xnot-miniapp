# XNOT Telegram Mini App MVP

홀더 수를 늘리기 위한 Telegram Mini App MVP입니다.

## 기능
- Telegram WebApp 실행 감지
- TON Connect 지갑 연결
- 미션 체크
- 추천인 코드 입력
- 에어드랍 신청 API

## 실행
```bash
npm install
npm run dev
```

## 배포
Vercel에 배포 후 `public/tonconnect-manifest.json`의 `url`, `iconUrl`을 실제 도메인으로 수정하세요.

## BotFather 연결
1. @BotFather → /newbot
2. /newapp 또는 Bot Settings → Mini App 설정
3. 배포 URL 입력
4. /setmenubutton으로 앱 버튼 연결

## 실운영 추가 필요
- Telegram initData 서버 검증
- DB 저장(Supabase 추천)
- 미션 자동검증
- 중복 지갑/중복 유저 차단
- Jetton 지급 스크립트 또는 관리자 지급 페이지
