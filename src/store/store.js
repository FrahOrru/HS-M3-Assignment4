import { defineStore } from "pinia";

const myKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'https://api.usa.gov/crime/fbi/sapi'
const validRel = ['Acquaintance', 'Babysittee', 'Boyfriend/Girlfriend', 'Child', 'Relationship Unknown', 'Neighbor', 'Friend', 'Stranger'];
const validLocations = ["Residence Home", "Highway/Alley/Street/Sidewalk", "Unknown", "Parking Garage/Lot", "Field/Woods", 'Jail/Prison/Corrections Facility', 'Commercial/Office Building', 'Gas Station'];
const validWeapons = ['Personal Weapons', 'Handgun', 'Knife/Cutting Instrument', 'Firearm', 'Other', 'Blunt Object', 'Asphyxiation', 'Unknown'];
const validLinkedoffense = ['Destruction/Damage/Vandalism of Property', 'Weapon Law Violations', 'Simple Assault', 'Kidnapping/Abduction', 'Drug/Narcotic Violations', 'Burglary/Breaking & Entering', 'All Other Larceny', 'Drug Equipment Violations'];

const allCrimeTypes = [
    {
        value: "violent-crime",
        label: "All Violent Crime"
    },
    {
        value: "homicide",
        label: "Homicide"
    },
    {
        value: "rape",
        label: "Rape"
    },
    {
        value: "robbery",
        label: "Robbery"
    },
    {
        value: "aggravated-assault",
        label: "Aggravated Assault"
    },
    {
        value: 'property-crime',
        label: 'All Property Crime'
    },
    {
        value: "arson",
        label: "Arson"
    },
    {
        value: "burglary",
        label: "Burglary"
    },
    {
        value: "larceny",
        label: "Larceny-theft"
    },
    {
        value: "motor-vehicle-theft",
        label: "Motor Vehicle Theft"
    }
]

export const useStore = defineStore('main', {
    state: () => ({ selectedState: {}, victimDemographics: {}, offenderDemographics: {}, crimeLocation: {}, crimeRelationship: {}, crimeWeapons: {}, linkedoffense: {}, allCrimeTypes: allCrimeTypes, maxScore: 1}),
    getters: {
        getVictiomDemographics: (state) => state.victimDemographics,
        getOffenderDemographics: (state) => state.offenderDemographics,
        getSelectedState: (state) => state.selectedState,
        getCrimeLocation: (state) => state.crimeLocation,
        getCrimeRelationship: (state) => state.crimeRelationship,
        getCrimeWeapons: (state) => state.crimeWeapons,
        getCrimeLinkedoffense: (state) => state.linkedoffense,
        getAllCrimeTypes: (state) => state.allCrimeTypes,
        getCurrentProgressMaxScore: (state) => state.maxScore
    },
    actions: {
        async fetchSelectedStateValues(id) {
            try {
                this.selectedState = {};
                let selectedState = await (await fetch(baseUrl + '/api/estimates/states/' + id + '/2020/2021' + '?API_KEY=' + myKey)).json();
                this.selectedState = selectedState.results[0];
            } catch (error) {
                return error
            }
        },
        async fetchOffenderDemographics(id, currentCrime) {
            try {
                this.offenderDemographics = {};
                let offenderDemographics = await (await fetch(baseUrl + '/api/nibrs/' + currentCrime  + '/offender/states/' + id + '/age' + '?API_KEY=' + myKey)).json();
                this.offenderDemographics = demographicFilter(offenderDemographics);
            } catch (error) {
                return error
            }
        },
        async fetchVictimsDemographics(id, currentCrime) {
            try {
                this.victimDemographics = {};
                let victimDemographics = await (await fetch(baseUrl + '/api/nibrs/' + currentCrime  + '/victim/states/' + id + '/age' + '?API_KEY=' + myKey)).json();
                this.victimDemographics = demographicFilter(victimDemographics);
            } catch (error) {
                return error
            }
        },
        async fetchCrimeLocation(id, currentCrime) {
            try {
                this.crimeLocation = {};
                let crimeLocation = await (await fetch(baseUrl + '/api/nibrs/' + currentCrime  + '/victim/states/' + id + '/location' + '?API_KEY=' + myKey)).json();

                this.crimeLocation = filterByArrayOfValid(crimeLocation, validLocations);
            } catch {
            }
        },
        async fetchCrimeRelationship(id, currentCrime) {
            try {
                this.crimeRelationship = {};
                let relationship = await (await fetch(baseUrl + '/api/nibrs/' + currentCrime  + '/victim/states/' + id + '/relationship' + '?API_KEY=' + myKey)).json();
                
                this.crimeRelationship = filterByArrayOfValid(relationship, validRel);
            } catch {
            }
        },
        async fetchCrimeWeapons(id, currentCrime) {
            try {
                this.crimeWeapons = {};
                let weapons = await (await fetch(baseUrl + '/api/nibrs/' + currentCrime  + '/offense/states/' + id + '/weapons' + '?API_KEY=' + myKey)).json();
                
                this.crimeWeapons = filterByArrayOfValid(weapons, validWeapons);
            } catch {
            }
        },
        async fetchCrimeLinkedoffense(id, currentCrime) {
            try {
                this.linkedoffense = {};
                let linkedoffense = await (await fetch(baseUrl + '/api/nibrs/' + currentCrime  + '/offense/states/' + id + '/linkedoffense' + '?API_KEY=' + myKey)).json();
                
                this.linkedoffense = filterByArrayOfValid(linkedoffense, validLinkedoffense);
            } catch {
            }
        },
        async changeProgressMaxScore(currentCrime) {
            let maxScore = 0;
            switch(currentCrime) {
                case 'violent-crime':
                    maxScore = this.getSelectedState?.violent_crime
                break;
                case 'homicide':
                    maxScore = this.getSelectedState?.homicide
                break;
                case 'rape':
                    maxScore = this.getSelectedState?.rape_revised
                break;
                case 'robbery':
                    maxScore = this.getSelectedState?.robbery
                break;
                case 'aggravated-assault':
                    maxScore = this.getSelectedState?.aggravated_assault
                break;
                case 'property-crime':
                    maxScore = this.getSelectedState?.property_crime
                break;
                case 'arson':
                    maxScore = this.getSelectedState?.arson
                break;
                case 'burglary':
                    maxScore = this.getSelectedState?.burglary
                break;
                case 'larceny':
                    maxScore = this.getSelectedState?.larceny
                break;
                case 'motor-vehicle-theft':
                    maxScore = this.getSelectedState?.motor_vehicle_theft
                break;
            }

            this.maxScore = maxScore;
        }
    }
  })


    function demographicFilter(value) {
        value.data = value.data.filter(elem => elem.data_year === 2021 && elem.key !== '0-9' && elem.key !== '80-89' && elem.key !== '90-Older')
        value.keys = value.keys.filter(elem => elem !== '0-9' && elem !== '80-89' && elem !== '90-Older');
        return value;
    }

    function filterByArrayOfValid(value, valid) {
        value.data = value.data.filter(elem => elem.data_year === 2021 && valid.includes(elem.key))
        value.keys = value.keys.filter(elem => valid.includes(elem));
        return value;
    }