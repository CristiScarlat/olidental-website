import { useRouter } from 'next/router';
import { useEffect, useRef } from "react";
import { teamCards } from "../utils/uiConstants";

const TeamMemberDetails = ({ data }) => {
    return (
        <div className="team-member-container row mb-3 m-auto" style={{ maxWidth: 1500 }}>
            <div className="col-md-3">
                <img src={data.thumbnail} width={320} height={480} placeholder="blur" loading='lazy' style={{objectFit: 'contain'}}/>
            </div>
            <div className="col-md-9">
                <h4 className="text-white">{data.title}</h4>
                <div className="mb-3" dangerouslySetInnerHTML={{ __html: data.body }}></div>
                {data?.specializations?.length > 0 && <>
                <strong>Specializari:</strong>
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

const Team = () => {
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
            {teamCards.length > 0 && teamCards?.map(teamMember => (
                <div key={teamMember.title} ref={ref => { teamMemberContainerRef.current[teamMember?.title] = ref }}>
                    {/* <hr /> */}
                    <TeamMemberDetails data={teamMember}/>
                </div>
            ))}
        </>
    )
}

export default Team;