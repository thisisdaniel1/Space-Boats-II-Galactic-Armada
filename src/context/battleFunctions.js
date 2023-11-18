const findFleetByIcon = (icon, fleets) => {
    return fleets.find((fleet) => fleet.icon === icon)
}

const calculateWings = (icon, fleets) => {
    // get the fleet with that icon
    const selectedFleet = findFleetByIcon(icon, fleets)

    // if fleet does not exist or null, return 0
    if (!selectedFleet){
        return {totalAttack: 0, totalDefense: 0}
    }

    return {totalAttack: selectedFleet.attack, totalDefense: selectedFleet.defense}
}

const executeBattle = (fleets) => {
    // get all enemy and friendly fleets
    const enemyFleets = fleets.filter((fleet) => fleet.enemy)
    const friendlyFleets = fleets.filter((fleet) => !fleet.enemy)

    // calculates total attack, defense for both sets of fleets
    // acc stands for accumulator and from what I can tell acc collects or "accumulates" the stats from each fleet which is reduced from the armada state
    const enemyStats = enemyFleets.reduce(
        (acc, fleet) => {
            acc.totalAttack += fleet.attack
            acc.totalDefense += fleet.defense
            return acc
        },
        // initial value of acc
        {totalAttack: 0, totalDefense: 0}
    )

    const friendlyStats = friendlyFleets.reduce(
        (acc, fleet) => {
            acc.totalAttack += fleet.attack
            acc.totalDefense += fleet.defense
            return acc
        },
        {totalAttack: 0, totalDefense: 0}
    )

    const message = 
        enemyStats.totalAttack > friendlyStats.totalDefense
            ? "You lost the engagement. The brass chewed you out of 100 euros."
            : "You won. The bounties on those ships earned you 100 euros."

    return {
        enemyStats: enemyStats,
        friendlyStats: friendlyStats,
        message: message,
    }
}

export { calculateWings, executeBattle }