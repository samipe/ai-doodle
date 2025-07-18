import { useEffect, useRef, useState } from 'react';
import './AudioVisualizerSection.css';

const AudioVisualizerSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let raf: number;

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      dataArray = new Uint8Array(analyser.frequencyBinCount);

      const draw = () => {
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width / dataArray.length;
        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] / 255;
          const h = 150 + v * 100;
          const barHeight = v * canvas.height;
          ctx.fillStyle = `hsl(${h}, 80%, 60%)`;
          ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
        }
        raf = requestAnimationFrame(draw);
      };
      draw();
    };

    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (audioCtx) audioCtx.close();
    };
  }, [active]);

  return (
    <section className="audio-visual-section">
      <canvas ref={canvasRef} width={600} height={200}></canvas>
      <button className="audio-btn" onClick={() => setActive(a => !a)}>
        {active ? 'Stop Mic Visualizer' : 'Start Mic Visualizer'}
      </button>
    </section>
  );
};

export default AudioVisualizerSection;
