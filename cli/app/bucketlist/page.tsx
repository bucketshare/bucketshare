export default function Bucketlist() {
    const bucketlist = [
        { titel: "reisen" },
        { titel: "ein Buch schreiben" },
        { titel: "Fallschirmspringen" },
        { titel: "eine neue Sprache lernen" },
        { titel: "den Mount Everest sehen" }
    ];

    return (
        <div className="relative min-h-[100dvh] bg-gradient-to-b from-blue-100 via-white to-blue-50">
            <header className="py-8">
                <h1 className="text-center font-extrabold text-3xl text-blue-700 drop-shadow-sm">Bucketlist</h1>
                <p className="text-center text-gray-500 mt-2">Deine entspannten Ziele fürs Leben ✨</p>
            </header>
            <main className="flex flex-col gap-6 px-4 max-w-md mx-auto">
                {bucketlist.map((p, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 rounded-xl shadow-md p-5 text-lg font-medium flex items-center gap-3 hover:scale-105 transition-transform"
                    >
                        <span className="text-blue-400 text-2xl">🌴</span>
                        <span>{p.titel}</span>
                    </div>
                ))}
            </main>
            <button
                className="fixed left-1/2 -translate-x-1/2 bottom-[10dvh] bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-xl font-semibold text-lg flex items-center gap-2 transition-all"
            >
                <span className="text-2xl">➕</span>
                Add
            </button>
        </div>
    );
}