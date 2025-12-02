import GlassCard from "../GlassCard";

export default function GlassCardExample() {
  return (
    <div className="min-h-[200px] bg-gradient-to-br from-violet-600 to-slate-900 p-8 rounded-lg">
      <GlassCard className="p-6">
        <h3 className="text-white font-semibold text-lg">Glassmorphism Card</h3>
        <p className="text-white/70 mt-2">This card has a beautiful frosted glass effect.</p>
      </GlassCard>
    </div>
  );
}
