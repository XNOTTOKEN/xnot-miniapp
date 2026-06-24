'use client';

import { TonConnectButton, TonConnectUIProvider, useTonAddress } from '@tonconnect/ui-react';
import { useEffect, useMemo, useState } from 'react';

declare global {
  interface Window { Telegram?: any }
}

function MiniApp() {
  const walletAddress = useTonAddress();
  const [tgUser, setTgUser] = useState<any>(null);
  const [tasks, setTasks] = useState({ join: false, follow: false, repost: false, invite: false });
  const [ref, setRef] = useState('');
  const [status, setStatus] = useState('');

const reward = useMemo(() => {
  let total = 0;
  if (tasks.join) total += 100;
  if (tasks.follow) total += 100;
  if (tasks.repost) total += 300;
  if (tasks.invite) total += 500;
  return total;
}, [tasks]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();
    setTgUser(tg?.initDataUnsafe?.user || null);
    const startParam = tg?.initDataUnsafe?.start_param;
    if (startParam) setRef(startParam);
  }, []);

  const toggle = (key: keyof typeof tasks) => setTasks(prev => ({ ...prev, [key]: !prev[key] }));

  async function claim() {
    if (!walletAddress) return setStatus('먼저 TON 지갑을 연결해줘.');
    if (reward < 300) return setStatus('최소 3개 미션을 완료해야 신청 가능.');

    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tgUser, walletAddress, tasks, reward, ref })
    });
    const data = await res.json();
    setStatus(data.message);
  }

  return (
    <main className="wrap">
      <section className="hero">
        <div className="badge">XNOT Holder Campaign</div>
        <h1>Join. Earn. Hold.</h1>
        <p>Telegram Mini App에서 미션을 완료하고 XNOT 에어드랍을 신청하세요.</p>
        <TonConnectButton />
      </section>

      <section className="card">
        <h2>내 정보</h2>
        <div className="row"><span>Telegram</span><b>{tgUser?.username ? '@' + tgUser.username : tgUser?.first_name || 'Telegram에서 실행 필요'}</b></div>
        <div className="row"><span>Wallet</span><b className="addr">{walletAddress || 'Not connected'}</b></div>
        <div className="row"><span>예상 보상</span><b>{reward.toLocaleString()} XNOT</b></div>
      </section>

      <section className="card">
        <h2>미션</h2>
        <button onClick={() => toggle('join')} className={tasks.join ? 'task done' : 'task'}>① 텔레그램 채널 입장 +100 XNOT</button>
        <button onClick={() => toggle('follow')} className={tasks.follow ? 'task done' : 'task'}>② X 공식 계정 팔로우 +100 XNOT</button>
        <button onClick={() => toggle('repost')} className={tasks.repost ? 'task done' : 'task'}>③ 게시글 리포스트 +300 XNOT</button>
        <button onClick={() => toggle('invite')} className={tasks.invite ? 'task done' : 'task'}>④ 친구 초대 인증 +500 XNOT</button>
      </section>

      <section className="card">
        <h2>초대 코드</h2>
        <input value={ref} onChange={e => setRef(e.target.value)} placeholder="추천인 코드 또는 Telegram ID" />
        <button className="primary" onClick={claim}>Airdrop 신청</button>
        {status && <p className="status">{status}</p>}
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <TonConnectUIProvider manifestUrl="https://xnot-miniapp.vercel.app/tonconnect-manifest.json">
      <MiniApp />
    </TonConnectUIProvider>
  );
}
