import { useRouter } from 'next/router';
import { useEffect, useRef } from "react";
import { teamCards } from "../utils/uiConstants";
import { personSlug } from "../utils/schema";
import styles from "../styles/team.module.css";
import { toWebp } from '../utils/images';
const TeamMemberDetails = ({ data }) => {
    return (
        <div className="team-member-container row mb-3 m-auto bg-gray" style={{ maxWidth: 1500, color: 'black' }}>
            <h4 className={styles.titleMobile}>{data.title}</h4>
            <div className="col-md-3">
              { data.thumbnail ? <img src={toWebp(data.thumbnail)} alt={data.title} width={320} height={480} loading='lazy' style={{objectFit: 'contain'}}/>
                :
                <div style={{border: "1px solid #eeeded", borderRadius: 5, height: "100%", backgroundColor: "#eeeded", margin: "0 0.5rem"}}>

                </div>
              }
            </div>
            <div className="col-md-9">
                <h4 className={styles.titleDesktop}>{data.title}</h4>
                <div className="my-3" dangerouslySetInnerHTML={{ __html: data.body }}></div>
                {data?.specializations?.length > 0 && <>
                <strong>Specializări:</strong>
                <ul className="mt-2">
                    {data.specializations.map((specialization, index) => (
                        <li key={specialization+index}>{specialization}</li>
                    ))}
                </ul>
                </>}
                {data?.services?.length > 0 && <>
                    <strong>Servicii:</strong>
                    <ul>
                        {data.services.map((service, index) => (
                            <li key={service+index}>{service}</li>
                        ))}
                    </ul>
                </>}
            </div>
        </div>
    )
}

const Echipa = () => {
    const router = useRouter();
    const teamMemberContainerRef = useRef({});

    useEffect(() => {
        if (router?.query?.id) {
            const selectedElem = teamMemberContainerRef.current[router.query.id];
            window.scrollTo(0, selectedElem?.offsetTop);
        }
    }, [router.query]);

    return (
        <>
            <h1 className="text-center pt-3">Echipa noastră</h1>
            {teamCards.length > 0 && teamCards?.map((teamMember, index) => (
                <div key={teamMember.title} id={personSlug(teamMember)} ref={ref => { teamMemberContainerRef.current[teamMember?.title] = ref }} style={index === 0 ? {marginTop: '1rem'} : {}}>
                    {/* <hr /> */}
                    <TeamMemberDetails data={teamMember}/>
                </div>
            ))}
        </>
    )
}

Echipa.seo = {
    title: "Echipa noastră | Olidental Clinic Timișoara",
    description: "Cunoaște echipa Olidental Clinic Timișoara: medici stomatologi și asistente cu specializări în implantologie, estetică dentară și reabilitări orale.",
    canonical: "https://olidental.ro/echipa",
};

export default Echipa;