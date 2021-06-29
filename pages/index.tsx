import styled from "@emotion/styled";
import Head from "next/head";
import React from "react";
import useSWR from "swr";

import ArticleList from "components/article/ArticleList";
import Maybe from "components/common/Maybe";
import Banner from "components/home/Banner";
import Tags from "components/home/Tags";
import TabList from "components/home/TabList";
import checkLogin from "lib/utils/checkLogin";
import storage from "lib/utils/storage";

const IndexPageContainer = styled("div")``;

const IndexPagePresenter = styled("div")`
  margin: 1.5rem auto 0;
  padding: 0 15px;
  @media (min-width: 544px) {
    max-width: 576px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 940px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const MainContent = styled("div")`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;

const ContentContainer = styled("div")`
  width: 100%;
  @media (min-width: 768px) {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 75%;
    max-width: 75%;
  }
`;

const FeedToggle = styled("div")`
  margin-bottom: -1px;
`;

const SidebarContainer = styled("div")`
  @media (min-width: 768px) {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 25%;
    max-width: 25%;
  }
`;

const SidebarPresenter = styled("div")`
  padding: 5px 10px 10px;
  background: #f3f3f3;
  border-radius: 4px;
`;

const SidebarTitle = styled("p")`
  margin-top: 0;
  margin-bottom: 0.2rem;
`;

const IndexPage = () => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const [tab, setTab] = React.useState(isLoggedIn ? 'feed' : 'global')
  React.useEffect(() => {
    setTab(isLoggedIn ? 'feed' : 'global')
  }, [isLoggedIn])
  return (
    <>
      <Head>
        <title>HOME | NEXT REALWORLD</title>
        <meta
          name="description"
          content="Next.js + SWR codebase containing realworld examples (CRUD, auth, advanced patterns, etc) that adheres to the realworld spec and API"
        />
      </Head>
      <IndexPageContainer className="home-page">
        <Maybe test={!isLoggedIn}>
          <Banner />
        </Maybe>
        <IndexPagePresenter>
          <MainContent>
            <ContentContainer>
              <FeedToggle>
                <TabList tab={tab} setTab={setTab} />
              </FeedToggle>
              <ArticleList what={tab}/>
            </ContentContainer>
            <SidebarContainer>
              <SidebarPresenter>
                <SidebarTitle>Popular Tags</SidebarTitle>
                <Tags />
              </SidebarPresenter>
            </SidebarContainer>
          </MainContent>
        </IndexPagePresenter>
      </IndexPageContainer>
    </>
  )
}

export default IndexPage;