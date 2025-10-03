import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";

const DemoOne = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <GlassFilter />
      
      <GlassEffect className="rounded-3xl px-8 py-6">
        <div className="text-white text-xl font-semibold">
          Liquid Glass Box
        </div>
      </GlassEffect>
    </div>
  );
};

export { DemoOne };
