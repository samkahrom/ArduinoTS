import React, { useState, useEffect } from 'react';

function Ruokahaku () {
	
	const [ruoka, setRuoka] = useState([]);
	const [teksti, setTeksti] = useState('Haetaan');
	
	 const fechUrl = async () => {
		try {
			let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';
			const response = await fetch(url);
			const json = await response.json();
            setTeksti('');
            setRuoka(json.meals);
            console.log(json.meals);

		} catch (error) {
            setTeksti('Haku ei onnistunut');
		}

	}
    
    useEffect(() => {
        fechUrl();
    }, [])

    if (teksti.length > 0 ) {
        return (
            <div>
                { teksti }
            </div>
        );
    }

    return (
        <div>
            {
                ruoka.map( r => {
                    return (
                        <div key={ r.strMeal }>
                            { r.strMeal }
                        </div>
                    );
                })
            }
        </div>
    );
}
export default Ruokahaku;