import { PROFIL_SEKOLAH_P1, PROFIL_SEKOLAH_P2, PROFIL_SEKOLAH_P3 } from "@/configs/constants/homepage";
import SectionAbout from "./components/section-about";

function AboutMe() {
  return (
    <main>
      <SectionAbout id="profil-sekolah" title="Profil Sekolah">
        <p>{PROFIL_SEKOLAH_P1}</p>
        <p>{PROFIL_SEKOLAH_P2}</p>
        <p>{PROFIL_SEKOLAH_P3}</p>
      </SectionAbout>
      <SectionAbout id="kurikulum" title="Kurikulum" withBackground>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </SectionAbout>
      <SectionAbout id="aktifitas-siswa" title="Aktivitas Siswa">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </SectionAbout>
    </main>
  );
}

export default AboutMe;
