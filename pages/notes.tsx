import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import tw from "twin.macro";

const Notes: React.FC<any> = (props: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full pt-5`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
        INNER PAGE
    </motion.div>
  );
};

export default Notes;
