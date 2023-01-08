import { FC, useState } from "react";
import { questions } from "@/shared/constants/questions";
import Container from "@/components/layout/container";
import Title from "@/components/ui/typography/title";
import Button from "@/components/ui/button";
import Text from "@/components/ui/typography/text";
import s from "./Question.module.scss";

const QuestionPage: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  return (
    <Container>
      <div className={s.wrapper}>
        <Title view="secondary" color="white" align="center">
          Question #1234
        </Title>

        <div className={s.question}>
          <div className={s.title}></div>

          <div className={s.userInput}></div>
        </div>

        <footer className={s.buttons}>
          <Button className={s.button} view="primary">
            <Text view="primary" color="white">
              Submit
            </Text>
          </Button>

          <Button className={s.button} view="ghost">
            <Text view="primary" color="white">
              Cancel
            </Text>
          </Button>
        </footer>
      </div>
    </Container>
  );
};

export default QuestionPage;
