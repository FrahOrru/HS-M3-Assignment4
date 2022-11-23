import { defineStore } from "pinia";

const myKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'https://api.usa.gov/crime/fbi/sapi'
const validRel = ['Acquaintance', 'Babysittee', 'Boyfriend/Girlfriend', 'Child', 'Relationship Unknown', 'Neighbor', 'Friend', 'Stranger'];
const validLocations = ["Residence Home", "Highway/Alley/Street/Sidewalk", "Unknown", "Parking Garage/Lot", "Field/Woods", 'Jail/Prison/Corrections Facility', 'Commercial/Office Building', 'Gas Station'];
const validWeapons = ['Personal Weapons', 'Handgun', 'Knife/Cutting Instrument', 'Firearm', 'Other', 'Blunt Object', 'Asphyxiation', 'Unknown'];
const validLinkedoffense = ['Destruction/Damage/Vandalism of Property', 'Weapon Law Violations', 'Simple Assault', 'Kidnapping/Abduction', 'Drug/Narcotic Violations', 'Burglary/Breaking & Entering', 'All Other Larceny', 'Drug Equipment Violations'];

export const useStore = defineStore('main', {
    state: () => ({ selectedState: {}, victimDemographics: {}, offenderDemographics: {}, crimeLocation: {}, crimeRelationship: {}, crimeWeapons: {}, linkedoffense: {}}),
    getters: {
        getVictiomDemographics: (state) => state.victimDemographics,
        getOffenderDemographics: (state) => state.offenderDemographics,
        getSelectedState: (state) => state.selectedState,
        getCrimeLocation: (state) => state.crimeLocation,
        getCrimeRelationship: (state) => state.crimeRelationship,
        getCrimeWeapons: (state) => state.crimeWeapons,
        getCrimeLinkedoffense: (state) => state.linkedoffense,
    },
    actions: {
        async fetchSelectedStateValues(id) {
            try {
                let selectedState = await (await fetch(baseUrl + '/api/estimates/states/' + id + '/2020/2021' + '?API_KEY=' + myKey)).json();
                this.selectedState = selectedState.results[0];
            } catch (error) {
                return error
            }
        },
        async fetchOffenderDemographics(id) {
            try {
                let offenderDemographics = await (await fetch(baseUrl + '/api/nibrs/violent-crime/offender/states/' + id + '/age' + '?API_KEY=' + myKey)).json();
                this.offenderDemographics = demographicFilter(offenderDemographics);
            } catch (error) {
                return error
            }
        },
        async fetchVictimsDemographics(id) {
            try {
                let victimDemographics = await (await fetch(baseUrl + '/api/nibrs/violent-crime/victim/states/' + id + '/age' + '?API_KEY=' + myKey)).json();
                this.victimDemographics = demographicFilter(victimDemographics);
            } catch (error) {
                return error
            }
        },
        async fetchCrimeLocation(id) {
            try {

                let crimeLocation = await (await fetch(baseUrl + '/api/nibrs/violent-crime/victim/states/' + id + '/location' + '?API_KEY=' + myKey)).json();

                this.crimeLocation = filterByArrayOfValid(crimeLocation, validLocations);
            } catch {
            }
        },
        async fetchCrimeRelationship(id) {
            try {
                let relationship = await (await fetch(baseUrl + '/api/nibrs/violent-crime/victim/states/' + id + '/relationship' + '?API_KEY=' + myKey)).json();
                
                this.crimeRelationship = filterByArrayOfValid(relationship, validRel);
            } catch {
            }
        },
        async fetchCrimeWeapons(id) {
            try {
                let weapons = await (await fetch(baseUrl + '/api/nibrs/violent-crime/offense/states/' + id + '/weapons' + '?API_KEY=' + myKey)).json();
                
                this.crimeWeapons = filterByArrayOfValid(weapons, validWeapons);
            } catch {
            }
        },
        async fetchCrimeLinkedoffense(id) {
            try {
                let linkedoffense = await (await fetch(baseUrl + '/api/nibrs/violent-crime/offense/states/' + id + '/linkedoffense' + '?API_KEY=' + myKey)).json();
                
                this.linkedoffense = filterByArrayOfValid(linkedoffense, validLinkedoffense);
            } catch {
            }
        },
    }
  })


    function demographicFilter(value) {
        value.data = value.data.filter(elem => elem.data_year === 2021 && elem.key !== '0-9')
        value.keys = value.keys.filter(elem => elem !== '0-9');
        return value;
    }

    function filterByArrayOfValid(value, valid) {
        value.data = value.data.filter(elem => elem.data_year === 2021 && valid.includes(elem.key))
        value.keys = value.keys.filter(elem => valid.includes(elem));
        return value;
    }