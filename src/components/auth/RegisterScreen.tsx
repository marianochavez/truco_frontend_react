import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";

import {useForm} from "../../hooks/useForm";
import {Navbar} from "../ui/Navbar";
import {PlayerContext} from "../../providers/PlayerProvider";

interface RegisterFormProps {
  lUsername: string;
  lName: string;
  lPassword: string;
  lConfirmPassword: string;
}

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    lUsername: "",
    lName: "",
    lPassword: "",
    lConfirmPassword: "",
  } as RegisterFormProps);
  const {register} = useContext(PlayerContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {lUsername, lName, lPassword, lConfirmPassword} = formValues as RegisterFormProps;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lPassword !== lConfirmPassword) {
      setError("Las contraseñas no coinciden");

      return;
    }
    const res = await register(lUsername, lName, lPassword, lConfirmPassword);

    if (res.status == "OK") {
      navigate("/login");
    } else {
      setError(JSON.stringify(res.data, null, 2));
    }
  };

  return (
    <>
      <Navbar />
      <section className="nes-container is-centered animate__animated animate__fadeIn animate__slow">
        <h2>Registro</h2>
        {!error && <p>El usuario debe ser único!</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
        <form className="container" onSubmit={(e) => handleRegister(e)}>
          <div className="nes-field">
            <input
              required
              autoComplete="off"
              className="nes-input"
              name="lUsername"
              placeholder="Usuario"
              type="text"
              value={lUsername}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
            />
          </div>

          <div className="nes-field">
            <input
              required
              autoComplete="off"
              className="nes-input"
              name="lName"
              placeholder="Nombre"
              type="text"
              value={lName}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
            />
          </div>

          <div className="nes-field">
            <input
              autoComplete="off"
              className="nes-input"
              name="lPassword"
              placeholder="Contraseña"
              type="password"
              value={lPassword}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
            />
          </div>

          <div className="nes-field">
            <input
              autoComplete="off"
              className="nes-input"
              name="lConfirmPassword"
              placeholder="Confirmar contraseña"
              type="password"
              value={lConfirmPassword}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
            />
          </div>

          <button className="nes-btn" style={{margin: "1em"}} type="submit">
            Registrarme
          </button>
        </form>

        <div>
          <p>
            Ya tienes cuenta? <Link to="/login">Ingresar</Link>
          </p>
        </div>
      </section>
    </>
  );
};
