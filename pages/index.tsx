import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Flex, Heading, Box, Spacer, Text, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const handleVote = () => {
    console.log('handle vote');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Topic Vote</title>
      </Head>

      <Flex justify="space-between" align="center">
        <Box p="2">
          <Heading size="md">Topic Vote</Heading>
        </Box>
        <Spacer />
        <Box p="2">
          <ConnectButton />
        </Box>
      </Flex>

      <Flex marginTop="10">
        <Box p="2">
          <Text fontSize="2xl">
            当前提案：
          </Text>
          <Text fontSize="lg">
            {topic}
          </Text>
        </Box>
        <Spacer />
        <Box p="2">
          <Text fontSize="2xl">
            当前票数：{total}
          </Text>
        </Box>
      </Flex>

      <Flex marginTop="5">
        <Box p="2">
          <Text fontSize="2xl">
            过期时间：{expiredTime}
          </Text>
        </Box>
        <Spacer />
        <Box p="2">
          <Button colorScheme="blue" onClick={handleVote}>Vote</Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
