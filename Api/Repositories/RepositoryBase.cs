using Api.Contexts;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        CodehunterContext ctx = new CodehunterContext();
        public void Add(TEntity obj)
        {
            try
            {
                ctx.Set<TEntity>().Add(obj);
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Delete(TEntity obj)
        {
            try
            {
                ctx.Set<TEntity>().Remove(obj);
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            return ctx.Set<TEntity>().ToList();
        }

        public TEntity GetById(int id)
        {
            return ctx.Set<TEntity>().Find(id);
        }

        public void Update(TEntity obj)
        {
            try
            {
                ctx.Entry(obj).State = EntityState.Modified;
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
