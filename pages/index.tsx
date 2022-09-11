import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Flex, Heading, Box, Spacer, Text, Button, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import useBaseInfo from '../hooks/useBaseInfo';
import { timestampToTime } from '../utils/index';
import { TopicVoteAddress } from '../config/contracts';
import TopicVoteABI from '../abis/TopicVote.json';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { config } = usePrepareContractWrite({
    addressOrName: TopicVoteAddress,
    contractInterface: TopicVoteABI.abi,
    functionName: 'vote'
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const { isOwner, topic, total, expiredTime, isEnd } = useBaseInfo();
  const { isConnected } = useAccount();

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
      <Stack spacing={3}>
        <Alert status="success" hidden={!isSuccess}>
          <AlertIcon />
          Already voted
        </Alert>
      </Stack>
      <Flex marginTop="5">
        <Box p="2">
          <Text fontSize="2xl">
            过期时间：{ timestampToTime(expiredTime) }
          </Text>
        </Box>
        <Spacer />
        <Box p="2">
          <Button 
            colorScheme="blue"
            onClick={() => write?.()}
            disabled={isEnd || !isConnected || !write}
            isLoading={isLoading}
          >
            Vote
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
