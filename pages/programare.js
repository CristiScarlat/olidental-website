import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const Programare = () => {
  const [recaptcha, setRecaptcha] = useState();
  const [spinner, setSpinner] = useState(false);

  const formRef = useRef();
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
      setSpinner(true)
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      emailjs
        .sendForm(serviceId, templateId, e.target, {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        })
        .then(
          () => {
            setSpinner(false);
            toast.success(`Un email de confirmare a fost trimis la ${email}, mulțumim.`);
          },
          (error) => {
            setSpinner(false);
            console.log('EmailJS-FAILED...', error.text);
            toast.error(`Ne pare rău, emailul de confirmare pe adresa ${email} nu a putut fi trimis. Verificați din nou adresa de email completată in formular sau încercați mai târziu.`)
          },
        )
        .catch(error => {
          setSpinner(false);
          console.log('CODE-FAILED...', error);
          toast.error(`Ne pare rău, emailul de confirmare pe adresa ${email} nu a putut fi trimis. Verificați din nou adresa de email completată in formular sau încercați mai târziu.`)
        })
    }

  }

  const onRecaptchaChange = (value) => {
    setRecaptcha(value)
  }

  return (
    <div>
      <ToastContainer newestOnTop theme="colored" position={"bottom-right"}/>
      <Form ref={formRef} className="m-auto p-3 bg-gray rounded" style={{maxWidth: "50rem"}} id="form-programare" onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Nume</Form.Label>
          <Form.Control type='text' placeholder='Nume' name='user_name' autoComplete="off"/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formSurname' >
          <Form.Label>Prenume</Form.Label>
          <Form.Control type='text' placeholder='Prenume' name='user_surname' autoComplete="off"/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPhone'>
          <Form.Label>Telefon</Form.Label>
          <Form.Control type='text' placeholder='Telefon' name='user_phone' autoComplete="off"/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Adresa email' name='user_email' autoComplete="off"/>
          <Form.Text className='text-muted'>
            Confirmarea programării va fi trimisă pe această adresă de email.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' >
          <Form.Label>Intervalul de timp preferat</Form.Label>
          <Form.Select name='user_time_interval'>
            <option value="oricând">oricând</option>
            <option value="înainte de ora 12">înainte de ora 12</option>
            <option value="după ora 12">după ora 12</option>
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
          <Button variant={'success'} type='submit' className="d-flex align-items-center gap-2">
            <span>Fă-ți o programare</span>
            {spinner && <Spinner animation="border" variant="light" role="status" size="sm">
              <span className="visually-hidden">Se trimite...</span>
            </Spinner>}
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Programare;