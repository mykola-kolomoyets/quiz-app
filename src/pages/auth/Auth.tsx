import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store";
import { classes } from "./constants";
import Container from "@/components/layout/container";
import Title from "@/components/ui/typography/title";
import Text from "@/components/ui/typography/text";
import Button from "@/components/ui/button";
import TextField from "@/components/form/text-field";
import Select, { SelectOption } from "@/components/form/select";
import s from "./Auth.module.scss";

const AuthPage: FC = () => {
  const { setUserData } = useUserStore();

  const [name, setName] = useState("");

  const [chosenClass, setChosenClass] = useState<SelectOption | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const isSubmitDisabled = useMemo(() => {
    return !name || !chosenClass?.value;
  }, [name, chosenClass]);

  const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    setUserData({
      name,
      form: chosenClass,
    });

    navigate("/question");
  }, []);

  return (
    <Container>
      <div className={s.wrapper}>
        <Title
          className={s.title}
          view="primary"
          color="white"
          weight="medium"
          align="center"
        >
          Quiz APP
        </Title>

        <div className={s.form}>
          <TextField
            label="Enter your name"
            placeholder="Enter your name"
            value={name}
            onChange={onNameChange}
          />

          <Select
            additionalClasses={s.select}
            label="Select your class"
            instanceId="classes"
            value={chosenClass}
            onChange={(value) => value && setChosenClass(value as SelectOption)}
            options={classes}
            placeholder="Enter your class"
          />
        </div>

        <footer className={s.buttons}>
          <Button
            className={s.button}
            view="primary"
            disabled={isSubmitDisabled}
            onClick={onSubmit}
          >
            <Text view="primary" color="white">
              Continue
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

export default AuthPage;
