import { Box, Text, Button } from "@chakra-ui/react";

const FooterLulus = () => {
  return (
    <Box p={6}>
      <Text mb={4} color={"#999"} letterSpacing={"1px"} textAlign={"justify"} fontFamily={"Lato"} fontWeight={"300"} fontSize={"0.8rem"}>
        Status kelulusan Anda ditetapkan setelah Sekolah melakukan verifikasi data akademik (rapor dan/atau nilai ujian). Silakan Anda membaca peraturan tentang kelulusan siswa.
      </Text>
      <Button colorScheme={"blue"} onClick={() => window.history.back()} _hover={{ bg: "white", color: "blue.500" }}>
        Kembali
      </Button>
    </Box>
  );
};

export default FooterLulus;
