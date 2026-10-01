import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Reflections from '@/pages/Reflections';
import CourseDetail from '@/pages/CourseDetail';
import Documentation from '@/pages/Documentation';
import PdfViewer from '@/pages/PdfViewer';
import Admin from '@/pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/refleksi" element={<Reflections />} />
          <Route path="/refleksi/:courseId" element={<CourseDetail />} />
          <Route path="/refleksi/:courseId/dokumen" element={<PdfViewer />} />
          <Route path="/dokumentasi" element={<Documentation />} />
          <Route path="/kelola" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
