'use client'

const Panel = ({ recommendations }) => {
    return (
        <div className="recommendation-container p-5 h-auto">
      <h2 className="text-xl font-semibold mb-4 text-white ">Recommendations</h2>
      <div className="recommendation-item">
        <h3 className="text-lg font-normal  text-blue-400 mb-4">
          Router: 
          <span className="text-white text-base ml-3">{recommendations.router}</span>
        </h3>
        <h3 className="text-lg font-normal  text-blue-400 mb-4">
          Coverage: 
          <span className="text-white text-base ml-3">{recommendations.coverage}</span>
        </h3>
        <h3 className="text-lg font-normal  text-blue-400 mb-2">Router Details:</h3>
        <ul className="list-disc pl-6">
          {recommendations.routerDetails.map((detail, index) => (
            <li key={index} className="text-white text-base ml-3">{detail}</li>
          ))}
        </ul>
        {recommendations.additional.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-normal text-blue-400 mb-2">Additional Recommendations:</h4>
            <ul className="list-disc pl-6">
              {recommendations.additional.map((item, index) => (
                <li key={index} className="text-white text-base ml-3">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
      );
}

export default Panel