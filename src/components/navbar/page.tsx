
export default function NavBar(){
  return(
    <nav className="relative z-50 border-b border-white/10 bg-[#050A1F]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-black text-white" style={{ fontFamily: '"Fredoka", "Poppins", sans-serif' }}>
                IGNITION <span className="text-[#4A90E2]">HackVerse</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-white font-semibold hover:text-[#4A90E2] transition-colors duration-200" style={{ fontFamily: '"Poppins", sans-serif' }}>
                HOME
              </a>
              <a href="#prizes" className="text-white/80 font-semibold hover:text-[#4A90E2] transition-colors duration-200" style={{ fontFamily: '"Poppins", sans-serif' }}>
                PRIZES
              </a>
              <a href="#timeline" className="text-white/80 font-semibold hover:text-[#4A90E2] transition-colors duration-200" style={{ fontFamily: '"Poppins", sans-serif' }}>
                TIMELINE
              </a>
              <a href="#problem-statement" className="text-white/80 font-semibold hover:text-[#4A90E2] transition-colors duration-200" style={{ fontFamily: '"Poppins", sans-serif' }}>
                PROBLEM STATEMENT
              </a>
              <a href="#rulebook" className="text-white/80 font-semibold hover:text-[#4A90E2] transition-colors duration-200" style={{ fontFamily: '"Poppins", sans-serif' }}>
                RULEBOOK
              </a>
            </div>
            <button className="hidden md:block px-6 py-3 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4A90E2]/50 transform hover:-rotate-2" style={{ fontFamily: '"Poppins", sans-serif' }}>
              REGISTER NOW 🚀
            </button>
            {/*Mobile laoyut*/}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
  )
}