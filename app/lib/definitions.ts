export type Employee = {
    id: string;
    name: string;
    email: string;
    position: string;
    department: string;
    hireDate: string;
    level: string;
};

export type PeopleLead = {
    id: string;
    name: string;
    avatarUrl: string
}

export type CapabilityLead = {
    id: string;
    name: string;
    avatarUrl: string;
}

export type Informe = {
    id: string;
    name: string;
}

export type UserProfile = {
    id: string;
    name: string;
    role: string;
    level: string;
    department: string;
    email: string;
    phone: string;
    direction: {
        city: string;
        state: string;
        country: string;
    };
    avatarUrl: string;
    bio: string;
    projects: {
        id: string;
        name: string;
        client: string;
        cargability: string;
        endDate: string;
    }[];
    certifications: {
        id: string;
        name: string;
        expiration: string;
    }[];
    goals: {
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
    softSkills: string[];
    hardSkills: string[];
    interests: string[];
    peopleLead: {
        id: string;
        name: string;
        avatarURL: string;
    };
    capabilityLead: {
        id: string;
        name: string;
        avatarURL: string;
    };
}