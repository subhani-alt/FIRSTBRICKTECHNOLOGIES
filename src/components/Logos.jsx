import { FiCpu, FiCommand, FiActivity, FiGlobe, FiDatabase, FiCloud } from 'react-icons/fi';

const Logos = () => {
  const brands = [
    { name: 'SYNTHETIX', icon: FiCpu },
    { name: 'APEX CORP', icon: FiCommand },
    { name: 'ALPHA.AI', icon: FiActivity },
    { name: 'ORBIT INFRA', icon: FiCloud },
    { name: 'QUANTUM LABS', icon: FiGlobe },
    { name: 'CYBERNET', icon: FiDatabase },
  ];

  // Duplicate the brands list to create a seamless infinite loop
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden relative">
      {/* Background gradients for soft fading edges */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            Empowering Next-Gen Teams Globally
          </p>
        </div>

        {/* Marquee Ticker */}
        <div className="flex w-full overflow-hidden relative">
          <div className="flex gap-16 items-center animate-marquee whitespace-nowrap min-w-full">
            {marqueeItems.map((brand, idx) => {
              const Icon = brand.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300 pointer-events-none"
                >
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-electricBlue" />
                  <span className="font-bold text-sm tracking-[0.2em] font-sans">
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logos;
