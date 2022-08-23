import { css } from '@emotion/react';
import { theme, breakpoints, HamburgerIcon, iconSize, spacing } from '@expo/styleguide';
import React, { useState } from 'react';

import { Logo } from './Logo';
import { ThemeSelector } from './ThemeSelector';

import { Button } from '~/ui/components/Button';
import { SidebarHead } from '~/ui/components/Sidebar';
import { BOLD } from '~/ui/components/Text';

type HeaderProps = {
  sidebar: React.ReactNode;
  sidebarActiveGroup: string;
  isMobileMenuVisible: boolean;
  setMobileMenuVisible: (isMobileMenuVisible: boolean) => void;
};

export const Header = ({
  sidebar,
  sidebarActiveGroup,
  isMobileMenuVisible,
  setMobileMenuVisible,
}: HeaderProps) => {
  const [isMobileSearchVisible, setMobileSearchVisible] = useState(false);
  return (
    <>
      <nav css={[containerStyle, isMobileMenuVisible]}>
        <div css={[columnStyle, leftColumnStyle]}>
          <Logo />
        </div>
        <Search version="latest" />
        <div css={[columnStyle, rightColumnStyle, hideOnMobileStyle]}>
          <ThemeSelector />
        </div>
        <div css={[columnStyle, rightColumnStyle, showOnMobileStyle]}>
          <Button
            theme="transparent"
            css={[mobileButtonStyle, isMobileSearchVisible && mobileButtonActiveStyle]}
            onClick={() => {
              setMobileMenuVisible(false);
              setMobileSearchVisible(prevState => !prevState);
            }}>
            <SearchIcon size={iconSize.small} />
          </Button>
          <Button
            theme="transparent"
            css={[mobileButtonStyle, isMobileMenuVisible && mobileButtonActiveStyle]}
            onClick={() => {
              setMobileMenuVisible(!isMobileMenuVisible);
              setMobileSearchVisible(false);
            }}>
            <HamburgerIcon size={iconSize.small} />
          </Button>
        </div>
      </nav>
      {isMobileMenuVisible && (
        <nav css={[containerStyle, showOnMobileStyle]}>
          <div css={[columnStyle, leftColumnStyle]}>
            <BOLD>Theme</BOLD>
          </div>
          <div css={[columnStyle, rightColumnStyle]}>
            <ThemeSelector />
          </div>
        </nav>
      )}
      {isMobileMenuVisible && (
        <div css={mobileSidebarStyle}>
          <SidebarHead sidebarActiveGroup={sidebarActiveGroup} />
          {sidebar}
        </div>
      )}
      {isMobileSearchVisible && (
        <nav css={[containerStyle, showOnMobileStyle]}>
          <Search mobile version="latest" css={mobileSearchInputStyle} />
        </nav>
      )}
    </>
  );
};

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  background-color: ${theme.background.default};
  z-index: 2;
  margin: 0 auto;
  padding: 0 ${spacing[4]}px;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${theme.border.default};
  gap: ${spacing[4]}px;
`;

const columnStyle = css`
  flex-shrink: 0;
  display: flex;
  background-color: transparent;
`;

const leftColumnStyle = css`
  flex-grow: 1;
  align-items: center;

  @media screen and (max-width: ${(breakpoints.medium + breakpoints.large) / 2}px) {
    flex-basis: auto;
    width: auto;
  }
`;

const rightColumnStyle = css`
  justify-content: flex-end;

  @media screen and (max-width: ${(breakpoints.medium + breakpoints.large) / 2}px) {
    flex-basis: auto;
    width: auto;
  }
`;

const showOnMobileStyle = css`
  display: none;

  @media screen and (max-width: ${(breakpoints.medium + breakpoints.large) / 2}px) {
    display: flex;
  }
`;

const hideOnMobileStyle = css`
  @media screen and (max-width: ${(breakpoints.medium + breakpoints.large) / 2}px) {
    display: none;
  }
`;

const mobileButtonStyle = css`
  padding: 0 ${spacing[3]}px;
  margin-left: ${spacing[2]}px;

  &:hover {
    background-color: ${theme.background.tertiary};
    box-shadow: none;
  }
`;

const mobileButtonActiveStyle = css`
  background-color: ${theme.background.secondary};
`;

const mobileSearchInputStyle = css`
  margin: 0;
`;

const mobileSidebarStyle = css`
  background-color: ${theme.background.secondary};
  height: calc(100vh - (60px * 2));
  overflow: auto;
`;
