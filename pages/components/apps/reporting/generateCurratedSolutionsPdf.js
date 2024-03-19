import SolutionTemplate from "@/pages/components/apps/reporting/solutionTemplate";

const GenerateCurratedSolutionsPdf = ({curratedSolutions, chartImage, isCuratedSolution}) => {

    return (
        <>
            <SolutionTemplate solutions={curratedSolutions} chartImage={chartImage} isCuratedSolution={isCuratedSolution}/>
        </>
    );
};

GenerateCurratedSolutionsPdf.propTypes = {};

GenerateCurratedSolutionsPdf.defaultProps = {};

GenerateCurratedSolutionsPdf.layout = "Contentlayout";

export default GenerateCurratedSolutionsPdf;
