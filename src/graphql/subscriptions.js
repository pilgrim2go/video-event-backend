/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($owner: String!) {
    onCreateEvent(owner: $owner) {
      id
      name
      photos {
        items {
          id
          eventId
          bucket
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($owner: String!) {
    onUpdateEvent(owner: $owner) {
      id
      name
      photos {
        items {
          id
          eventId
          bucket
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($owner: String!) {
    onDeleteEvent(owner: $owner) {
      id
      name
      photos {
        items {
          id
          eventId
          bucket
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto($owner: String!) {
    onCreatePhoto(owner: $owner) {
      id
      eventId
      event {
        id
        name
        photos {
          nextToken
        }
        owner
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      owner
    }
  }
`;
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto($owner: String!) {
    onUpdatePhoto(owner: $owner) {
      id
      eventId
      event {
        id
        name
        photos {
          nextToken
        }
        owner
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      owner
    }
  }
`;
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto($owner: String!) {
    onDeletePhoto(owner: $owner) {
      id
      eventId
      event {
        id
        name
        photos {
          nextToken
        }
        owner
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
      owner
    }
  }
`;
