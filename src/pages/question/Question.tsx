import {
  ChangeEvent,
  FC,
  FormEvent,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import clsx from "clsx";
import { QuestionVariant } from "@/shared/utils/types";
import { useSnackbarStore } from "@/store/snackbar";
import useQuotes from "@/shared/utils/hooks/useQuotes";
import useGetQuestion from "@/shared/utils/hooks/useGetQuestion";
import { blurVariants, fadeContentVariants, fadeVariants } from "./animations";
import Container from "@/components/layout/container";
import Title from "@/components/ui/typography/title";
import Button from "@/components/ui/button";
import Text from "@/components/ui/typography/text";
import Radio from "@/components/form/radio";
import Spinner from "@/components/layout/spinner";
import TextField from "@/components/form/text-field";
import s from "./Question.module.scss";
import expandIcon from "./assets/expand.svg";
import compressIcon from "./assets/compress.svg";

const Snackbar = lazy(() => import("@/components/ui/snackbar"));

const QuestionPage: FC = () => {
  const { openSnackbar, closeSnackbar } = useSnackbarStore();

  const { getRandomQuote } = useQuotes();

  const { question, status, refetch } = useGetQuestion();

  const [selectedAnswer, setSelectedAnswer] = useState<QuestionVariant | null>(
    null
  );

  const [enteredAnswer, setEnteredAnswer] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const isVariantsQuestion = useMemo(
    () => question && !!question?.answersVariants,
    [question]
  );

  const isInputQuestion = useMemo(() => {
    return !isVariantsQuestion && typeof question?.correctAnswer === "string";
  }, [isVariantsQuestion, question]);

  const isImageQuestion = useMemo(() => {
    return question?.imageUrl;
  }, [question]);

  const isSubmitDisabled = useMemo(() => {
    if (isVariantsQuestion) {
      return status === "loading" || !selectedAnswer;
    }

    if (isInputQuestion) {
      return status === "loading" || !enteredAnswer;
    }
  }, [
    isVariantsQuestion,
    isInputQuestion,
    status,
    selectedAnswer,
    enteredAnswer,
  ]);

  const getVariantStatus = useCallback(
    (variant: QuestionVariant) => {
      if (isSubmitted) {
        const correctAnswer = (question?.correctAnswer as QuestionVariant)
          .value;

        const isAnswerCorrect = variant?.value === correctAnswer;

        if (variant.value === selectedAnswer?.value) {
          return isAnswerCorrect ? "correct" : "incorrect";
        }

        if (isAnswerCorrect) {
          return "correct";
        }
      }

      if (variant.value === selectedAnswer?.value) return "selected";
    },
    [isSubmitted, selectedAnswer]
  );

  const onVariantAnswerClick = useCallback((variant: QuestionVariant) => {
    return (event: FormEvent<HTMLInputElement>) => {
      event.preventDefault();

      setSelectedAnswer(variant);
    };
  }, []);

  const onInputValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setEnteredAnswer(value);
    },
    [setEnteredAnswer]
  );

  const onSubmitClick = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  const onNextQuestionClick = useCallback(async () => {
    closeSnackbar();
    setIsSubmitted(false);

    if (isVariantsQuestion) {
      setSelectedAnswer(null);
    }

    if (isInputQuestion) {
      setEnteredAnswer("");
    }

    await refetch();
  }, [refetch, closeSnackbar, isVariantsQuestion, isInputQuestion]);

  const getIsCorrectAnswer = useCallback(() => {
    let isCorrectAnswer = false;

    if (isVariantsQuestion) {
      isCorrectAnswer =
        selectedAnswer?.value ===
        (question?.correctAnswer as QuestionVariant).value;
    }

    if (isInputQuestion) {
      isCorrectAnswer =
        enteredAnswer.toLowerCase() ===
        (question?.correctAnswer as string).toLowerCase();
    }

    return isCorrectAnswer;
  }, [
    isVariantsQuestion,
    isInputQuestion,
    question,
    enteredAnswer,
    selectedAnswer,
  ]);

  const showSnackbar = useCallback(async () => {
    const isCorrectAnswer = getIsCorrectAnswer();

    let description = question?.explanation || "";

    if (isCorrectAnswer) {
      const quote = await getRandomQuote();

      description = `${quote?.text} - (${quote?.author})`;
    }

    openSnackbar({
      type: isCorrectAnswer ? "success" : "error",
      description,
    });
  }, [
    selectedAnswer,
    question,
    openSnackbar,
    getRandomQuote,
    getIsCorrectAnswer,
  ]);

  useEffect(() => {
    if (isSubmitted) {
      showSnackbar();
    }
  }, [isSubmitted]);

  return (
    <Container>
      <div
        className={clsx(s.wrapper, {
          [s.wrapperExpanded]: isImageExpanded,
        })}
      >
        <div className={s.questionNumber}>
          <AnimatePresence>
            {status === "loading" ? (
              <motion.div className={s.blur} {...blurVariants} />
            ) : null}

            <Title key="title" view="primary" color="white" align="center">
              Question #{question?.id}
            </Title>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {status === "loading" ? (
            <motion.div className={s.spinner} {...fadeVariants}>
              <Spinner />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {status === "loaded" ? (
            <motion.div className={s.question} {...fadeVariants}>
              <motion.div
                className={clsx(s.content, {
                  [s.contentExpanded]: isImageExpanded,
                })}
                {...fadeContentVariants}
              >
                <AnimatePresence>
                  {isSubmitted ? (
                    <motion.div className={s.blur} {...blurVariants} />
                  ) : null}
                </AnimatePresence>

                <Text
                  className={s.title}
                  view="primary"
                  weight="medium"
                  color="white"
                >
                  {question?.title}
                </Text>

                <div className={s.description}>
                  {question?.description.map((item, index) => (
                    <Text
                      key={index}
                      view="caption"
                      weight="regular"
                      color="white"
                    >
                      {item}
                    </Text>
                  ))}
                </div>

                {isImageQuestion && question?.imageUrl ? (
                  <LayoutGroup id="image">
                    <motion.div
                      layoutId="modal"
                      className={clsx(s.imageWrapper, {
                        [s.imageWrapperExpanded]: isImageExpanded,
                      })}
                    >
                      <img
                        className={s.image}
                        src={question.imageUrl}
                        alt={question?.title}
                      />

                      <button
                        className={s.expand}
                        onClick={() => setIsImageExpanded(true)}
                      >
                        <img src={expandIcon} alt="expand" />
                      </button>
                    </motion.div>

                    <AnimatePresence>
                      {isImageExpanded ? (
                        <motion.div
                          layoutId="modal"
                          className={s.expandedImage}
                        >
                          <img
                            className={s.image}
                            src={question.imageUrl}
                            alt={question?.title}
                          />

                          <button
                            className={s.expand}
                            onClick={() => setIsImageExpanded(false)}
                          >
                            <img src={compressIcon} alt="compress" />
                          </button>

                          <Button
                            className={s.closeButton}
                            view="primary"
                            onClick={() => setIsImageExpanded(false)}
                          >
                            <Text view="primary" color="white">
                              Close
                            </Text>
                          </Button>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </LayoutGroup>
                ) : null}
              </motion.div>

              <motion.div className={s.userInput} {...fadeContentVariants}>
                {isVariantsQuestion ? (
                  <Text
                    className={s.inputHint}
                    view="primary"
                    weight="medium"
                    color="white"
                  >
                    Choose the correct answer
                  </Text>
                ) : null}
                <motion.div
                  className={clsx({
                    [s.radioGrid]: isVariantsQuestion,
                  })}
                  {...fadeContentVariants}
                >
                  {question && isVariantsQuestion
                    ? question.answersVariants?.map((variant) => (
                        <Radio
                          key={variant.value}
                          id={variant.value}
                          label={variant.label}
                          checked={variant.value === selectedAnswer?.value}
                          status={getVariantStatus(variant)}
                          onChange={
                            isSubmitted
                              ? undefined
                              : onVariantAnswerClick(variant)
                          }
                        />
                      ))
                    : null}

                  {question && isInputQuestion ? (
                    <div className={s.inputWrapper}>
                      <TextField
                        additionalClasses={s.input}
                        label="Enter the answer"
                        value={enteredAnswer}
                        status={
                          isSubmitted
                            ? getIsCorrectAnswer()
                              ? "success"
                              : "error"
                            : undefined
                        }
                        errorMessage={
                          isSubmitted && !getIsCorrectAnswer()
                            ? `Correct answer: ${question?.correctAnswer}`
                            : ""
                        }
                        onChange={onInputValueChange}
                      />
                    </div>
                  ) : null}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!isImageExpanded ? (
          <footer className={s.buttons}>
            <Button
              className={s.button}
              view="primary"
              disabled={isSubmitDisabled}
              onClick={isSubmitted ? onNextQuestionClick : onSubmitClick}
            >
              <Text view="primary" color="white">
                {isSubmitted ? "Next question" : "Submit"}
              </Text>
            </Button>

            <Button
              className={s.button}
              view="ghost"
              disabled={status === "loading"}
            >
              <Text view="primary" color="white">
                Cancel
              </Text>
            </Button>
          </footer>
        ) : null}
      </div>

      <Snackbar />
    </Container>
  );
};

export default QuestionPage;
