import styled from "@emotion/styled";
import tw from "twin.macro";

const ListWrapper = styled.div(() => [
  tw`h-[max-content] min-h-full w-full relative`,
]);
const ListContainer = styled.div(() => [
  tw`absolute overflow-auto h-full w-full pt-[3.1rem] z-10`,
]);
export { ListWrapper, ListContainer };
