export type User = {
  id: string;
  name: string;
  email: string;
  linkedin_link: string;
};

export type Help = {
  name: string;
  route: string;
  description: string;
};

export type Project = {
  project_name: string;
  year: string;
  description: string;
};

export type Experience = {
  job_title: string;
  company: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
};

export type Education = {
  school_name: string;
  degree: string;
  location: string;
  notes: string;
  start_date: string;
  end_date: string;
};
