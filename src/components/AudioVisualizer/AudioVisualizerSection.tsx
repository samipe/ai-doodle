import { useEffect, useRef, useState } from 'react';
import './AudioVisualizerSection.css';

const AudioVisualizerSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    let animationId: number;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let ctx: CanvasRenderingContext2D;

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        const canvas = canvasRef.current!;
        ctx = canvas.getContext('2d')!;

        const render = () => {
          animationId = requestAnimationFrame(render);
          analyser.getByteFrequencyData(dataArray);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const barWidth = canvas.width / dataArray.length;
          dataArray.forEach((v, i) => {
            const h = (v / 255) * canvas.height;
            ctx.fillStyle = `hsl(${i / dataArray.length * 360}, 80%, 50%)`;
            ctx.fillRect(i * barWidth, canvas.height - h, barWidth - 1, h);
          });
        };
        render();
      } catch (err) {
        console.error(err);
        setActive(false);
      }
    };

    start();
    return () => {
      cancelAnimationFrame(animationId);
      analyser?.disconnect();
    };
  }, [active]);

  return (
    <section className="audio-visual-section">
      {!active && (
        <button className="audio-start" onClick={() => setActive(true)}>
          Start Audio Visualizer
        </button>
      )}
      <canvas ref={canvasRef} width={600} height={200} />
    </section>
  );
};

export default AudioVisualizerSection;
