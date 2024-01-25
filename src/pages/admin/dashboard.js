import { Text, Flex, Box, Heading, SimpleGrid, Th, Tr, Td, Tbody, Thead, Table, TableContainer } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdPeople } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { deleteCookie } from "cookies-next";
import Head from "next/head";
import axios from "axios";
import { ENV } from "@/utility/const";

const Dashboard = ({ data, setUsername, siswa }) => {
  useEffect(() => {
    setUsername(data.username);
  });
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box bg={"#614BFE"} pb={10}>
        <Heading fontFamily={"Lato"} p={10} color={"white"}>
          Dashboard
        </Heading>
        <SimpleGrid spacing={10} columns={[1, 2, 4]} p={10}>
          <Box bg={"white"} p={8} h={200} minW={"24%"} borderRadius={6} mb={5}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Box>
                <Text color={"gray.500"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"2xl"} mb={5}>
                  Siswa
                </Text>
                <Text color={"gray.700"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"4xl"}>
                  {siswa.total ?? 0}
                </Text>
              </Box>
              <MdPeople size={80} color={"blue"} />
            </Flex>
          </Box>
          <Box bg={"white"} p={8} h={200} minW={"24%"} borderRadius={6} mb={5}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Box>
                <Text color={"gray.500"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"2xl"} mb={5}>
                  Lulus
                </Text>
                <Text color={"gray.700"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"4xl"}>
                  {siswa.lulus ?? 0}
                </Text>
              </Box>
              <MdPeople size={80} color={"green"} />
            </Flex>
          </Box>
          <Box bg={"white"} p={8} h={200} minW={"24%"} borderRadius={6} mb={5}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Box>
                <Text color={"gray.500"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"2xl"} mb={5}>
                  Tidak Lulus
                </Text>
                <Text color={"gray.700"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"4xl"}>
                  {siswa.tidaklulus ?? 0}
                </Text>
              </Box>
              <MdPeople size={80} color={"red"} />
            </Flex>
          </Box>
          <Box bg={"white"} p={8} h={200} minW={"24%"} borderRadius={6} mb={5}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Box>
                <Text color={"gray.500"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"2xl"} mb={5}>
                  Dibuka
                </Text>
                <Text color={"gray.700"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"4xl"}>
                  {siswa.dibuka ?? 0}
                </Text>
              </Box>
              <AiFillEye size={80} color={"orange"} />
            </Flex>
          </Box>
        </SimpleGrid>
        <Box bg={"white"} mx={10} p={10} borderRadius={6}>
          <Text color={"gray.500"} fontFamily={"Lato"} fontWeight={"900"} fontSize={"2xl"} mb={8}>
            Riwayat
          </Text>
          <TableContainer>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>NISN</Th>
                  <Th>Nama</Th>
                  <Th>Status</Th>
                  <Th>Waktu Dibuka</Th>
                </Tr>
              </Thead>
              <Tbody>
                {siswa.listsiswa.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.nisn}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.status !== 1 ? "Tidak Lulus" : "Lulus"}</Td>
                    <Td>{item.openDate}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Text color={"gray.500"} fontFamily={"Lato"} fontWeight={"100"} fontSize={"1xl"} mb={8} align={"right"} fontStyle="italic">
              *Hanya 10 data dibuka terakhir
            </Text>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { headers } = req;
  // fetch data
  try {
    const users = await axios.get(`${ENV.base}/api/user`, {
      credentials: "same-origin",
      headers: {
        cookie: headers.cookie,
      },
    });

    const dashboard = await axios.get(`${ENV.base}/api/admin/dashboard`, {
      credentials: "same-origin",
      headers: {
        cookie: headers.cookie,
      },
    });
    const user = await users.data;
    const { data } = await dashboard.data;
    if (user.status === 401) {
      deleteCookie("token-key-adm", { req, res });
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
    return {
      props: {
        data: user.data,
        siswa: data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
}

export default Dashboard;
