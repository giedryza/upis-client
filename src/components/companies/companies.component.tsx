import styles from './companies.module.scss';

import { CompanyCard } from 'components/company-card/company-card.component';
import { SocialType } from 'domain/companies/companies.types';

const COMPANIES = [
  {
    _id: '1',
    logo: 'https://www.pipirobaidares.lt/wp-content/uploads/2018/06/pipiro-baidares.png',
    name: 'Pipiro baidarės',
    toursTotal: 8,
    website: 'www.pipirobaidares.lt',
    slug: 'pipiro-baidares',
    socials: [
      {
        _id: '5fb57180a0s97c90ba84f4b3f',
        type: SocialType.Facebook,
        link: 'www.aa.lt',
      },
      {
        _id: '5fb5718ff0a097c90ba84f4b3f',
        type: SocialType.Youtube,
        link: 'www.aa.lt',
      },
      {
        _id: '5fb5fsd7180a097c90ba84f4b40',
        type: SocialType.Twitter,
        link: 'bbbb.com',
      },
    ],
  },
  {
    _id: '2',
    logo: 'https://www.baidariunuoma.lt/wp-content/uploads/baidariu-nuoma.png',
    name: 'Baidarių nuoma',
    toursTotal: 5,
    // website: 'www.baidariunuoma.lt',
    slug: 'pipiro-baidares',
    socials: [],
  },
  {
    _id: '3',
    logo: 'https://www.vilniaus-baidares.lt/wp-content/uploads/2017/10/vilniaus-baidares.png',
    name: 'Vilniaus baidarės',
    toursTotal: 14,
    website: 'www.vilniaus-baidares.lt',
    slug: 'pipiro-baidares',
    socials: [
      {
        _id: '5fb57fsa180a097c90ba84f4b3f',
        type: SocialType.Youtube,
        link: 'www.aa.lt',
      },
    ],
  },
  {
    _id: '4',
    logo: 'http://www.baidariuuostas.lt/wp-content/uploads/2017/05/BU-logo@3x.png',
    name: 'Baidarių uostas',
    toursTotal: 11,
    website: 'www.baidariuuostas.lt',
    slug: 'pipiro-baidares',
    socials: [
      {
        _id: '5fb57180a097c90ba84fdgsda4b3f',
        type: SocialType.Youtube,
        link: 'www.aa.lt',
      },
      {
        _id: '5fb571sd80a097c90ba84f4b40',
        type: SocialType.Twitter,
        link: 'bbbb.com',
      },
    ],
  },
  {
    _id: '5',
    logo: 'http://www.bajorubaidares.lt/images/6.png',
    name: 'Bajorų baidarės',
    toursTotal: 0,
    website: 'www.bajorubaidares.lt',
    slug: 'pipiro-baidares',
    socials: [
      {
        _id: '5fb57180a097c90ba84f4b3gdff',
        type: SocialType.Facebook,
        link: 'www.aa.lt',
      },
    ],
  },
];

const Companies = () => {
  return (
    <section className={styles.container}>
      {COMPANIES.map((company) => (
        <CompanyCard
          key={company._id}
          logo={company.logo}
          name={company.name}
          toursTotal={company.toursTotal}
          website={company.website}
          // @ts-ignore
          socials={company.socials}
          slug={company.slug}
        />
      ))}
    </section>
  );
};

export { Companies };
