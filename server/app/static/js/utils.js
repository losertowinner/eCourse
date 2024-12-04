export function generateRandomColor(alphat = 0.2) {
    const red = Math.floor(parseInt(Math.random() * 255));
    const green = Math.floor(parseInt(Math.random() * 255));
    const blue = Math.floor(parseInt(Math.random() * 255));

    return `rgb(${red},${green},${blue}, ${alphat})`;
}

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Loading...',
        },
        legend: {
            display: true,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
    animations: {
        tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
        },
    },
    transitions: {
        show: {
            animations: {
                x: {
                    from: 0,
                },
                y: {
                    from: 0,
                },
            },
        },
        hide: {
            animations: {
                x: {
                    to: 0,
                },
                y: {
                    to: 0,
                },
            },
        },
    },
};

export async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chart data from ' + endpoint + '!');
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}