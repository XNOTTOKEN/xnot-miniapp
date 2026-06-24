import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // MVP: 여기서는 저장소 없이 응답만 반환.
  // 실운영에서는 Supabase/Firebase/DB에 tgUser, walletAddress, tasks, reward, ref 저장.
  if (!body.walletAddress) {
    return NextResponse.json({ ok: false, message: '지갑 주소가 없습니다.' }, { status: 400 });
  }

  console.log('XNOT CLAIM REQUEST', body);

  return NextResponse.json({
    ok: true,
    message: `신청 완료. 운영팀 확인 후 ${body.reward || 0} XNOT 지급 대기열에 등록됩니다.`
  });
}
