import { createContext, useContext, type ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

type ViewportContextType = {
  isMobileOrTablet: boolean;
  isDesktop: boolean;
  isLargeScreen: boolean;
};

const defaultValue: ViewportContextType = {
  isMobileOrTablet: false,
  isDesktop: false,
  isLargeScreen: false,
};

type Props = {
  children: ReactNode;
};

const ViewportContext = createContext<ViewportContextType>(defaultValue);

export const ViewportProvider: React.FC<Props> = ({ children }) => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px) and (max-width: 1823px)",
  });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1824px)" });

  return (
    <ViewportContext.Provider
      value={{ isMobileOrTablet, isDesktop, isLargeScreen }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = (): ViewportContextType =>
  useContext(ViewportContext);
