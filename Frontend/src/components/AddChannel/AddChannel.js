import styles from "./AddChannel.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createChannel } from "../../api/Channel";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket } from "../../socket";

export function AddChannel({ onShowAddChannel, resetChannel }) {
  const { user, getCurrent } = useContext(AuthContext);

  const validationSchema = yup.object({
    name: yup.string().required(),
    img: yup.string().required(),
  });

  const initialValues = {
    name: "",
    img: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ initialValues, resolver: yupResolver(validationSchema) });

  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
      if (await createChannel(values.name, values.img, user.id)) {
        onShowAddChannel(false);
        resetChannel(true);
        socket.emit("resetChannel", "");
        getCurrent();
      }
    } catch (message) {
      console.log("test");
      setError("generic", { type: "generic", message });
    }
  });

  function cancel() {
    document.getElementById("nameOnAddChannel").values = "";
    onShowAddChannel(false);
  }

  return (
    <div className={styles.container}>
      <h2>Ajouter un serveur</h2>
      <form onSubmit={submit} className="m10">
        <div>
          <input
            id="nameOnAddChannel"
            placeholder="nom du serveur"
            {...register("name")}
          />
        </div>
        <div>
          <input placeholder="url image" {...register("img")} className="mt20 mb20" />
        </div>
        <button
          className="btn btn-primary-reverse ml10 mr10"
          type="button"
          onClick={cancel}
        >
          Annuler
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          Valider
        </button>
      </form>
      <ul>
        {errors.name && (
          <li className={styles.errors}>{errors.name.message}</li>
        )}
        {errors.generic && (
          <li className={styles.errors}>{errors.generic.message}</li>
        )}
      </ul>
    </div>
  );
}
