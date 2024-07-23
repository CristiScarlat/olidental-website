import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Programare = () => {
  const [recaptcha, setRecaptcha] = useState();

  const isFormValid = (name, surname, phone, email, interval, gdpr) => {
    let valid = true;
    if(recaptcha === undefined) {
      toast.error("Confirmă ca nu ești robot.")
      valid = false
    }
    if(name === undefined || name === null || name === ""){
      toast.error("Vă rugăm completați numele dvs.")
      valid = false
    }
    if(surname === undefined || surname === null || surname === ""){
      toast.error("Vă rugăm completați prenumele dvs.")
      valid = false
    }
    if(phone === undefined || phone === null || phone === ""){
      toast.error("Vă rugăm completați numărul dvs. de telefon.")
      valid = false
    }
    if(email === undefined || email === null || email === ""){
      toast.error("Vă rugăm completați email ul dvs.")
      valid = false
    }
    if(!gdpr){
      toast.error("Vă rugăm bifați consimțământul pentru preluarea datelor dvs.")
      valid = false
    }
    return valid
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const surname = e.target[1].value;
    const phone = e.target[2].value;
    const email = e.target[3].value;
    const interval = e.target[4].value;
    const gdpr = e.target[5].checked;

    if(isFormValid(name, surname, phone, email, interval, gdpr)){
      console.log("send email")
    }

  }

  const onRecaptchaChange = (value) => {
    setRecaptcha(value)
  }

  return (
    <div>
      <ToastContainer newestOnTop theme="colored" position={"bottom-right"}/>
      <Form className="m-auto p-3 bg-gray rounded" style={{maxWidth: "50rem"}} id="form-programare" onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Nume</Form.Label>
          <Form.Control type='text' placeholder='Nume' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formSurname'>
          <Form.Label>Prenume</Form.Label>
          <Form.Control type='text' placeholder='Prenume' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPhone'>
          <Form.Label>Telefon</Form.Label>
          <Form.Control type='text' placeholder='Telefon' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Adresa email' />
          <Form.Text className='text-muted'>
            Confirmarea programării va fi trimisă pe această adresă de email.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' >
          <Form.Label>Intervalul de timp preferat</Form.Label>
          <Form.Select>
            <option value="null">oricând</option>
            <option value="morning">înainte de ora 12</option>
            <option value="afternoon">după ora 12</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox' id="customCheckbox">
          <Form.Check type='checkbox' label='Acord consimțământul preluării datelor personale' isValid/>
        </Form.Group>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
          onChange={onRecaptchaChange}
        />
        <div className="d-flex justify-content-end">
          <Button variant={'success'} type='submit'>
            Fă-ți o programare
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Programare;