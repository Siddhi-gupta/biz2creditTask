
/*------
utilty to calculate the distance between two given points with 
their latitudes and longitudes in degree
------*/

//calculate and return the distance in kilometers
let distance = (sourceLatitude, sourceLongitude, destinationLat, destinationLon) => {
		let radlatsrc = convertDegreeToRadians(sourceLatitude);
		let radlatdest = convertDegreeToRadians(destinationLat);
		let radtheta = getThetaInRadians(sourceLongitude, destinationLon);
        let distance = Math.sin(radlatsrc) * Math.sin(radlatdest) + Math.cos(radlatsrc) * Math.cos(radlatdest) * Math.cos(radtheta);
        
		if (distance > 1) {
			distance = 1;
		}
		distance = Math.acos(distance);
		distance = convertRadiansToDegree(distance);
		distance = distance * 60 * 1.1515;
        distance = distance * 1.609344;
		return distance;
    
};

//return the calculated theta (0) in radians
let getThetaInRadians = (longitude1, longitude2) => {
    return convertDegreeToRadians(longitude1-longitude2);
}

//conert dergrees to radians
let convertDegreeToRadians = (inDegree) => {
    return Math.PI * inDegree/180;
};

//convert radians to degree
let convertRadiansToDegree = (inRadians) => {
    return inRadians * 180/Math.PI;
}

module.exports = {
    calculateDistance: distance
}