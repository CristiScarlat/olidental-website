

const MakeAppointments = () => {
    return (
        <div className="make-appointment">
            <div className="container">

                <ul id="accordion" className="accordion">
                    <li>

                        <div className="link"><i className="fa fa-database"></i><span className="appointment-title">Make an Appointment</span> <i className="icon-chevron-down"></i> </div>

                        <section className="bgcolor-3">
                            <p className="error" id="error" style="display:none;"></p>
                            <p className="success" id="success" style="display:none;"></p>

                            <form name="appointment_form" id="appointment_form" method="post" action="#" onSubmit="return false">

                                <span className="input input--kohana">
                                    <input className="input__field input__field--kohana" type="text" id="input-29" name="input-29" />
                                    <label className="input__label input__label--kohana" htmlFor="input-29">
                                        <i className="icon-user6 icon icon--kohana"></i>
                                        <span className="input__label-content input__label-content--kohana">Your Name</span>
                                    </label>
                                </span>
                                <span className="input input--kohana">
                                    <input className="input__field input__field--kohana" type="text" id="input-30" name="input-30" />
                                    <label className="input__label input__label--kohana" htmlFor="input-30">
                                        <i className="icon-dollar icon icon--kohana"></i>
                                        <span className="input__label-content input__label-content--kohana">Email Address</span>
                                    </label>
                                </span>
                                <span className="input input--kohana last">
                                    <input className="input__field input__field--kohana" type="text" id="input-31" name="input-31" />
                                    <label className="input__label input__label--kohana" htmlFor="input-31">
                                        <i className="icon-phone5 icon icon--kohana"></i>
                                        <span className="input__label-content input__label-content--kohana">Phone Number</span>
                                    </label>
                                </span>

                                <span className="input input--kohana">
                                    <input className="input__field input__field--kohana" type="text" id="datepicker" placeholder="Appointment Date" onClick="" name="datepicker" />
                                </span>

                                <span className="input input--kohana message">
                                    <input className="input__field input__field--kohana" type="text" id="textarea" name="textarea" />
                                    <label className="input__label input__label--kohana" htmlFor="textarea">
                                        <i className="icon-new-message icon icon--kohana"></i>
                                        <span className="input__label-content input__label-content--kohana">Message</span>
                                    </label>
                                </span>

                                <input name="submit" type="submit" value="send" onClick="validateAppointment();" />
                            </form>


                        </section>



                    </li>

                </ul>
            </div>
        </div>
    )
}

export default MakeAppointments;