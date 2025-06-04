interface TalentDiscussionEnProgresoProps {
    id: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    TalentDiscussionFullData: any;
    loadAllData: () => Promise<void>;
}

export default function TalentDiscussionEnProgreso({
    id,
    loading,
    setLoading,
    TalentDiscussionFullData,
    loadAllData
}: TalentDiscussionEnProgresoProps) {

    console.log("TalentDiscussionEnProgreso", TalentDiscussionFullData);

    return(
        <div className="justify-center items-center flex flex-col p-4">
            {typeof TalentDiscussionFullData === 'object'
                ? <pre>{JSON.stringify(TalentDiscussionFullData, null, 2)}</pre>
                : String(TalentDiscussionFullData)}
        </div>
    )

}