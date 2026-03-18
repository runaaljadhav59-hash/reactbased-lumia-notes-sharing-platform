import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group relative flex flex-col h-full rounded-[20px] p-6 bg-[#0f0f11] border border-zinc-800/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />

      {/* Author info skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#18181b]" />
        <div className="flex flex-col gap-1">
          <div className="w-24 h-3 bg-[#18181b] rounded" />
          <div className="w-16 h-2 bg-[#18181b] rounded mt-0.5" />
        </div>
      </div>

      {/* Note Content skeleton */}
      <div className="flex-1 mb-6">
        <div className="w-3/4 h-5 bg-[#18181b] rounded mb-3" />
        <div className="w-[85%] h-5 bg-[#18181b] rounded mb-5" />
        
        <div className="space-y-2">
           <div className="w-full h-3 bg-[#18181b] rounded" />
           <div className="w-[90%] h-3 bg-[#18181b] rounded" />
           <div className="w-2/3 h-3 bg-[#18181b] rounded" />
        </div>
      </div>

      {/* Footer tags skeleton */}
      <div className="pt-5 flex items-end justify-between mt-auto">
         <div className="flex gap-2">
            <div className="w-14 h-5 bg-[#18181b] rounded-md" />
            <div className="w-16 h-5 bg-[#18181b] rounded-md" />
         </div>
         <div className="flex gap-3">
             <div className="w-10 h-4 bg-[#18181b] rounded" />
             <div className="w-10 h-4 bg-[#18181b] rounded" />
         </div>
      </div>
    </motion.div>
  );
}
