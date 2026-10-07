import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Barcode, Camera, Check, CheckCircle2, Cpu, ShieldCheck, ScanLine, Sparkles, X, RefreshCw } from 'lucide-react';
import type { ReturnInspectionRecord } from '../types';
import heroConsole from '../assets/images/demo_damaged_console_1790796955275.jpg';
import heroHeadphones from '../assets/images/demo_sony_headphones_1790796921054.jpg';
import heroDyson from '../assets/images/demo_dyson_airwrap_1790796944220.jpg';
import productDataset from '../data/productReturnDataset.json';

type Props = { inspections: ReturnInspectionRecord[]; onStartInspection: () => void; onViewQueue: () => void };
const imageByFile: Record<string, string> = {
  'demo_damaged_console_1790796955275.jpg': heroConsole,
  'demo_sony_headphones_1790796921054.jpg': heroHeadphones,
  'demo_dyson_airwrap_1790796944220.jpg': heroDyson,
  'demo_iphone_swap_1790796932266.jpg': heroConsole,
};
const samples = productDataset.products.map((product, index) => ({
  sku: product.sku,
  name: product.name,
  image: imageByFile[product.referenceImage] || heroConsole,
  state: product.sampleCondition === 'REVIEW' ? 'Review recommended' : 'Product match',
  confidence: [98, 92, 96, 87][index % 4],
}));
export const HomeView: React.FC<Props> = ({ inspections, onStartInspection, onViewQueue }) => {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [captured, setCaptured] = useState('');
  const [live, setLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sample = samples[sampleIndex];
  const completed = inspections.filter(i => i.status === 'COMPLETED').length;
  const flagged = inspections.filter(i => i.status === 'MANUAL_REVIEW').length;
  const autoRate = inspections.length ? Math.round((completed / inspections.length) * 100) : 92;
  useEffect(() => () => streamRef.current?.getTracks().forEach(t => t.stop()), []);
  useEffect(() => { const id = window.setInterval(() => setSampleIndex(i => (i + 1) % samples.length), 12000); return () => window.clearInterval(id); }, []);
  useEffect(() => { if (videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current; }, [cameraOpen, live]);
  const openCamera = async () => {
    setCameraError(''); setCaptured(''); setCameraOpen(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera access is unavailable. Open this site on localhost or HTTPS and try again.');
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      streamRef.current = stream; setLive(true);
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play().catch(() => undefined); }
    } catch (e) { setLive(false); setCameraError(e instanceof Error ? e.message : 'Unable to access camera. Check browser permissions.'); }
  };
  const capture = () => { const video = videoRef.current; if (!video || !video.videoWidth) return; const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight; const ctx = canvas.getContext('2d'); ctx?.drawImage(video, 0, 0); setCaptured(canvas.toDataURL('image/jpeg', .92)); };
  const closeCamera = () => { streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null; setLive(false); setCameraOpen(false); };
  return <div className="home-experience">
    <section className="home-hero">
      <div className="hero-green-panel"><div className="hero-brandline"><b>RETURNIQ</b><span>RETURN INTELLIGENCE</span></div>
        <div className="hero-eyebrow"><span className="live-dot"/> SMART RETURN OPERATIONS</div>
        <h1>Smarter Returns.<br/><em>Safer Decisions.</em></h1>
        <p className="hero-copy">AI-powered inspection, barcode scanning and visual analysis for faster, more accurate return processing.</p>
        <div className="workflow-pills"><div><Barcode/><span>Scan<br/>Barcode</span><b>›</b></div><div><Cpu/><span>Inspect<br/>with AI</span><b>›</b></div><div><CheckCircle2/><span>Get<br/>Decision</span></div></div>
        <div className="hero-actions"><button className="pink-action" onClick={onStartInspection}>Start Inspection <ArrowRight size={17}/></button><button className="text-action" onClick={onViewQueue}>View Return Queue <ArrowRight size={15}/></button></div>
        <div className="hero-footnote"><ShieldCheck size={14}/> Traceable decisions · Evidence-first workflow</div>
      </div>
      <div className="hero-photo-panel"><img src={sample.image} alt={sample.name}/><div className="photo-vignette"/><div className="confidence-float"><span className="confidence-check"><Check size={25}/></span><div><strong>{sample.confidence}%</strong><small>Confidence Score</small></div></div>
        <div className="detector-tag"><span className="live-dot"/> Product Detector</div><div className="scan-frame"><span className="frame-corner tl"/><span className="frame-corner tr"/><span className="frame-corner bl"/><span className="frame-corner br"/><span className="scan-cross">＋</span></div>
        <div className="inspection-checklist"><h3>AI Inspection <Check size={15}/></h3>{['Product Match','Condition','Accessories','Packaging'].map((x,i)=><div key={x}><span>{x}</span><Check size={14} className="mint-icon"/></div>)}</div>
        <div className="barcode-float"><div className="barcode-art"/><div><b>Barcode Scanned</b><small>{sample.sku}</small></div><span className="valid-pill"><Check size={12}/> Valid</span></div>
        <div className="sample-switch"><span>DEMO DATASET</span><button onClick={()=>setSampleIndex(i=>(i+1)%samples.length)} aria-label="Show next dataset product"><RefreshCw size={14}/> Next product</button></div>
      </div>
      <div className="hero-confidence-mobile"><Sparkles size={15}/> Live inspection workspace</div>
    </section>
    <section className="home-lower-grid">
      <article className="home-stats-card"><div className="section-kicker">RETURNIQ <span>INSPECT · ANALYZE · DECIDE</span></div><h2>From Return<br/>to <em>Resolution</em></h2><p>AI-driven inspection for accurate classification, reduced fraud and smarter reverse logistics.</p>
        <div className="metric-grid"><div className="metric mint"><span><CheckCircle2 size={13}/> Total Returns</span><strong>{248 + inspections.length}</strong><small>↑ 12% <i>vs last week</i></small></div><div className="metric gold"><span><Sparkles size={13}/> Auto Resolved</span><strong>{autoRate}%</strong><small>↑ 8% <i>vs last week</i></small></div><div className="metric rose"><span><ShieldCheck size={13}/> Fraud Detected</span><strong>{6 + flagged}</strong><small>↑ 33% <i>vs last week</i></small></div></div>
        <div className="stats-actions"><button className="pink-action" onClick={onStartInspection}>Start Inspection <ArrowRight size={17}/></button><button className="text-action" onClick={onViewQueue}>View Return Queue <ArrowRight size={15}/></button></div>
      </article>
      <article className="home-console-card"><div className="console-top"><b>RETURNIQ <span>INSPECTION CONSOLE</span></b><span className="backend-status"><i/> Demo ready</span><time>{new Date().toLocaleDateString(undefined,{day:'2-digit',month:'short'})}</time></div>
        <div className="console-body"><div className="console-tools"><button className="selected" onClick={openCamera}><Camera size={17}/> Camera</button><button onClick={onStartInspection}><Barcode size={17}/> Barcode</button><button onClick={onStartInspection}><ScanLine size={17}/> Gallery / Inspect</button><button onClick={onStartInspection}><Cpu size={17}/> Manual Review</button></div>
          <div className="console-preview"><img src={sample.image} alt={`${sample.name} inspection preview`}/><span className="live-badge"><i/> DEMO PREVIEW</span><div className="console-frame"/><div className="preview-actions"><button className="pink-action" onClick={openCamera}><Camera size={15}/> Open Camera</button><button onClick={onStartInspection}><ScanLine size={15}/> Start AI Inspection</button></div></div>
          <div className="console-results"><b>Inspection Result <Check size={14}/></b><div className="result-score"><CheckCircle2 size={20}/><span>Product match</span><strong>{sample.confidence}%</strong></div>{['Packaging check','Accessories check','Visual condition'].map(t=><div className="result-line" key={t}><Check size={13}/>{t}</div>)}</div></div>
        <div className="console-bottom"><div className="barcode-art"/><div><b>{sample.sku}</b><small>Dataset product · ready to inspect</small></div><span className="valid-pill"><Check size={12}/> Ready</span></div>
        <div className="console-complete"><Cpu size={20}/><div><b>AI inspection workspace ready</b><small>Open the camera or run an inspection to create a real record.</small></div><button onClick={onStartInspection}>View Workspace <ArrowRight size={16}/></button></div>
      </article>
    </section>
    <section className="home-dataset-strip"><div><span className="dataset-icon"><Barcode size={18}/></span><div><b>Product reference dataset</b><small>Sample catalog for demo matching and workflow testing</small></div></div><div className="dataset-items">{samples.map((s,i)=><button key={s.sku} onClick={()=>setSampleIndex(i)} className={i===sampleIndex?'active':''}><img src={s.image} alt=""/><span>{s.name}</span></button>)}</div><button className="camera-outline" onClick={openCamera}><Camera size={16}/> Test live camera</button></section>
    {cameraOpen && <div className="camera-overlay" role="dialog" aria-modal="true" aria-label="Live camera inspection"><div className="camera-dialog"><div className="camera-dialog-head"><div><span className="live-dot"/> LIVE CAMERA <h2>Capture return evidence</h2></div><button onClick={closeCamera} aria-label="Close camera"><X/></button></div>{captured?<img className="captured-preview" src={captured} alt="Captured return evidence"/>:live?<video ref={videoRef} autoPlay muted playsInline/>:<div className="camera-placeholder"><Camera size={35}/><p>Waiting for camera permission…</p></div>}{cameraError&&<div className="camera-error">{cameraError}</div>}<p className="camera-help">Allow camera access in your browser prompt. Use good lighting and keep the product centered.</p><div className="camera-dialog-actions"><button className="text-action" onClick={closeCamera}>Cancel</button>{captured&&<button onClick={()=>{setCaptured('');}}>Retake</button>}<button className="pink-action" disabled={!live} onClick={capture}><Camera size={16}/> Capture photo</button><button className="camera-continue" onClick={()=>{closeCamera();onStartInspection();}}>Continue to inspection <ArrowRight size={15}/></button></div></div></div>}
  </div>;
};
