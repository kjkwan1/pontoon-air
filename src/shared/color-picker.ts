export function getColor(aq: number): string {
    if (aq <= 50) {
        return 'good';
    }
    if (aq > 50 && aq <= 100) {
        return 'moderate';
    }
    if (aq > 100 && aq <= 150) {
        return 'unhealthy-at-risk';
    }
    if (aq > 150 && aq <= 200) {
        return 'unhealthy';
    }
    if (aq > 200 && aq <= 300) {
        return 'very-unhealthy';
    }   
    if (aq > 300) {
        return 'hazardous';
    }
    return '#000000';
}


export function getTextColor(aq: number): string {
    if (aq <= 50) {
        return 'text-good';
    }
    if (aq > 50 && aq <= 100) {
        return 'text-moderate';
    }
    if (aq > 100 && aq <= 150) {
        return 'text-unhealthy-at-risk';
    }
    if (aq > 150 && aq <= 200) {
        return 'text-unhealthy';
    }
    if (aq > 200 && aq <= 300) {
        return 'text-very-unhealthy';
    }   
    if (aq > 300) {
        return 'text-hazardous';
    }
    return '#000000';
}