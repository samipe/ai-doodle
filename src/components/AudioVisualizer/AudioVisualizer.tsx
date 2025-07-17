import { useEffect, useRef } from 'react';
import './AudioVisualizer.css';

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationId = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        const barWidth = canvas.width / bufferLength;
        dataArray.forEach((v,i) => {
          const barHeight = v / 255 * canvas.height;
          ctx.fillStyle = `hsl(${(i/bufferLength)*360},80%,50%)`;
          ctx.fillRect(i*barWidth, canvas.height - barHeight, barWidth-2, barHeight);
        });
      };
      draw();
    }).catch(err => {
      console.error(err);
    });

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas className="audio-canvas" ref={canvasRef} />;
};

const AudioVisualizerSection = () => (
  <section className="audio-section">
    <h1>Microphone Visualizer</h1>
    <AudioVisualizer />
  </section>
);

export default AudioVisualizerSection;
