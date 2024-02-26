import Head from "next/head";
import { Box, Flex, ScaleFade, Text } from "@chakra-ui/react";
import HeaderLulus from "@/components/Header/Lulus";
import FooterLulus from "@/components/Footer/FooterLulus";
import BodyLulus from "@/components/Body/BodyLulus";
import QRLulus from "@/components/QrCode/QrCodeLulus";
import BodyTidakLulus from "@/components/Body/BodyTidakLulus";
import HeaderTidakLulus from "@/components/Header/TidakLulus";
import axios from "axios";
import { ENV } from "@/utility/const";

export default function Result({ datas, info }) {
  return (
    <>
      <Head>
        <title>{info.judul_web ?? "Null Data"}</title>
        <meta name="title" content={info.judul_web} />
        <meta name="description" content="Selamat datang di Sistem Pengumuman Kelulusan SMA Negeri Surulangun. Dapatkan informasi kelulusan terbaru secara cepat dan akurat di sini. ©2024 Made With ❤️ Arizki Putra Rahman" />
        <meta name="image" content="https://lulosdak.arizkinewbie.com/img/main-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lulosdak.arizkinewbie.com/" />
        <meta property="og:title" content={info.judul_web} />
        <meta property="og:description" content="Selamat datang di Sistem Pengumuman Kelulusan SMA Negeri Surulangun. Dapatkan informasi kelulusan terbaru secara cepat dan akurat di sini. © 2024 Made With ❤️ Arizki Putra Rahman" />
        <meta property="og:image" content="https://lulosdak.arizkinewbie.com/img/main-logo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://lulosdak.arizkinewbie.com/" />
        <meta property="twitter:title" content={info.judul_web} />
        <meta property="twitter:description" content="Selamat datang di Sistem Pengumuman Kelulusan SMA Negeri Surulangun. Dapatkan informasi kelulusan terbaru secara cepat dan akurat di sini. © 2024 Made With ❤️ Arizki Putra Rahman" />
        <meta property="twitter:image" content="https://lulosdak.arizkinewbie.com/img/main-logo.png" />
      </Head>
      <ScaleFade initialScale={0.5} in={true}>
        <Box bgColor="rgba(0,0,0,0.3)" w={"full"} maxW={"1200"} backdropBlur={"md"}>
          {datas.status === 1 ? <HeaderLulus /> : <HeaderTidakLulus />}
          <Flex flexDirection={["column-reverse", "column-reverse", "row"]} alignItems={"flex-start"} justifyContent={"space-between"} p={6}>
            <Box>
              <Text color={"#88ccf0"} fontFamily={"Lato"} fontWeight={"900"} mb={1} fontSize={"0.9rem"}>
                NISN {datas.nisn ?? "-"}
              </Text>
              <Text color={"#fff"} fontFamily={"Lato"} fontWeight={"900"} letterSpacing={"2px"} mb={1} fontSize={["1.8rem", "1.9rem", "2.3rem"]}>
                {datas.name ?? "-"}
              </Text>
              <Text color={"#fff"} fontFamily={"Lato"} fontWeight={"300"} letterSpacing={"1px"} mb={1} fontSize={["0.9rem", "1rem", "1.2rem"]}>
                Kelas {datas.kelas ?? "-"}
              </Text>
              <Text color={"#fff"} fontFamily={"Lato"} fontWeight={"300"} letterSpacing={"1px"} mb={1} fontSize={["0.9rem", "1rem", "1.2rem"]}>
                {info.nama_sekolah ?? "-"}
              </Text>
            </Box>
            {datas.status === 1 && <QRLulus data={datas} info={info.nama_sekolah} />}
          </Flex>
          {datas.status === 1 ? <BodyLulus data={datas} profile={info} /> : <BodyTidakLulus />}
          {<FooterLulus />}
        </Box>
      </ScaleFade>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { req } = context;
  const { headers } = req;
  const student = await axios.get(ENV.base + "/api/student", {
    credentials: "include",
    headers: {
      cookie: headers.cookie,
    },
  });
  const info = await axios.get(ENV.base + "/api/info");
  const data2 = await info.data;
  const { data } = await student.data;
  return {
    props: {
      datas: data,
      info: data2.data,
    },
  };
}
