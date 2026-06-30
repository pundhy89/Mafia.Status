import React, { useState } from 'react';
import { FolderOpen, Info, Image as ImageIcon, Film, FileImage, ShieldCheck } from 'lucide-react';

export default function App() {
  const [files, setFiles] = useState<{ url: string; type: string; name: string }[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const mediaFiles = Array.from(selectedFiles)
      .filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'))
      .map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type,
        name: file.name,
      }));

    setFiles((prev) => [...mediaFiles, ...prev]);
  };

  const clearFiles = () => {
    files.forEach(f => URL.revokeObjectURL(f.url));
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-[#ece5dd] text-gray-900 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="text-center space-y-3 bg-white p-6 rounded-2xl shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#25D366]/10 rounded-full mb-2">
            <ShieldCheck className="w-8 h-8 text-[#25D366]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Status Anonim</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            Lihat status berupa foto atau video tanpa diketahui pengirimnya. 
            Aplikasi ini bekerja 100% offline dengan membaca file sementara (cache) di HP Anda.
          </p>
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-100 flex gap-3">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="font-semibold mb-1">Panduan Penggunaan (Khusus Android):</p>
              <ol className="list-decimal pl-4 space-y-1.5 opacity-90">
                <li>Buka WhatsApp dan biarkan status dari teman Anda termuat (jangan diklik).</li>
                <li>Gunakan tombol di bawah untuk memilih folder atau file.</li>
                <li>Cari folder: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-200 text-xs font-mono break-all block mt-1 mb-1">Android/media/com.whatsapp/WhatsApp/Media/.Statuses</code></li>
                <li className="text-xs mt-2 italic text-amber-700/80">
                  *Pastikan fitur "Tampilkan file tersembunyi" aktif di aplikasi File Manager Anda.
                </li>
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#25D366]/40 rounded-xl bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors cursor-pointer group">
              <FolderOpen className="w-10 h-10 text-[#25D366] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-700 mb-1">Pilih Folder Status</span>
              <span className="text-xs text-gray-500 text-center">Buka folder .Statuses sekaligus</span>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect} 
                multiple 
                // @ts-ignore
                webkitdirectory="" 
                directory="" 
              />
            </label>

            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <FileImage className="w-10 h-10 text-gray-400 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-700 mb-1">Pilih File Manual</span>
              <span className="text-xs text-gray-500 text-center">Pilih beberapa foto/video</span>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect} 
                multiple 
                accept="image/*,video/*"
              />
            </label>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-sm">
              <h2 className="font-semibold text-gray-800">Media Ditemukan ({files.length})</h2>
              <button 
                onClick={clearFiles}
                className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
              >
                Bersihkan
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((file, idx) => (
                <div key={idx} className="aspect-[9/16] bg-black rounded-xl overflow-hidden relative group shadow-sm">
                  {file.type.startsWith('video/') ? (
                    <>
                      <video src={file.url} controls className="w-full h-full object-contain" />
                      <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white backdrop-blur-sm">
                        <Film className="w-3.5 h-3.5" />
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="w-3.5 h-3.5" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}